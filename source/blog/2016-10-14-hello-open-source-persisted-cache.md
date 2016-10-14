---
title: Hello, Open Source!
description: Eating our own kibble with the persisted_cache gem.
author: bernd_ustorf
date: 2016-10-14 12:00 UTC
category: "Open Source"
tags: oss, ruby, caching
published: true
---

At a recent JarFest (our biannual, company-wide team meetup) we resolved to increase our investment in open source software. We're already totally dependent on Rails, Postgres and other open source projects. We provide [open source clients](https://github.com/taxjar) to our API in various languages. But we wanted to do more. I was intrigued by the idea of dogfooding - using our own product internally.

One of the first scaling steps required here at [TaxJar](https://www.taxjar.com) was summary tables. We have customers with millions of receipts within one tax period. When the first of these customers hit their reports, they timed out. Even with good indices we just couldn't query fast enough for Heroku's timeout.

END_SUMMARY

Summarizing receipt totals into a table solved this problem.  But it created a more insidious one. Several times we've had to walk new pieces of data up to the summary table. (Predicting the future is hard.)

Then we had a realization that seemed obvious in hindsight. We needed to query receipts asynchronously, but we didn't need to store results in a relational table. We could build a hash of totals for the period, cache it and drive reports off of that. When we needed more low level data, we could just start including it in the hash.

[Rails.cache.fetch](http://guides.rubyonrails.org/caching_with_rails.html) is a common, easy way to cache. Just pass an expensive method as a block to Rails.cache.fetch and it'll execute the first time. Results come from the cache after that. We use it several places in the app already, but just as an optimization - if there's a cache miss in these cases, it's no big deal.

We want pretty much the same functionality here, except we need to be sure that there won't be any cache misses because that would result in a timeout. The [persisted_cache](https://github.com/taxjar/persisted_cache) gem addresses this situation by overriding the internals of ActiveSupport::Cache::Store to check for a value in the DB.

We store this value by passing an option of `persisted_cache: 'write'` to Rails.cache.fetch when we prime the cache at night. When Rails.cache.fetch is called from the report controller, we pass `persisted_cache: 'require'`. On the first request, or if the cache has been cleared for whatever reason, the cache will prime itself from the DB rather than executing the underlying block. (Because we passed `require` and not `read` an error gets thrown if the hash is not in the DB. We rescue this and show a message that says the report is building).

This was all easy enough. Then the wrinkles started happening. Our CTO wanted it in a different database. Hm. Okay. Didn't want to address database connections in this gem AT ALL. Least intrusive way I could find was to specify an alternate base class for the model used to persist the key value pairs in an initializer. I had already created a template and a Rails install generator to handle creating the migration, just added another one that created an initializer that could be edited in the case of a second database.

Well, there was one problem with that. I had defined the ActiveRecord model for storing the key value pairs in a file. (That's usually the way you do it.) But, I needed this model to inherit from a class that would not be known until that initializer file I just mentioned had been loaded. I felt a bit like [ouroboros](http://www.crystalinks.com/ouroboros.html). Likely due to an innate aversion to metaprogramming, it took me a while to figure out I could define the model at run time in a config block for the gem like this:

```ruby
def self.configure
  self.configuration ||= Configuration.new
  yield(configuration)
  k = Class.new(PersistedCache.configuration.base_class) do
    validates :key, uniqueness: true
    serialize :value
    self.table_name = 'key_value_pairs'
  end
  PersistedCache.const_set 'KeyValuePair', k
end
```

Problem solved. Click done on that ticket. Well, maybe try it with Rails 5 first. Naturally I had built it to work with our current stack which (shhh, don't tell anyone) is still Rails 4. 

As soon as I did that, deprecation warnings out the proverbial ying yang. I had run afoul of [Yehuda Katz and alias\_method\_chain](http://yehudakatz.com/2009/03/06/alias_method_chain-in-models/). Granted, this is ancient history. But I hadn't reached into this bag of tricks for a while and last time I did you reached for `alias_method_chain`. It worked fine, but, I was not gonna argue with Yehuda and the Rails core team, so, I refactored to use **prepend** as recommended like this:

```ruby
module PersistedCache
  module Extension
    def fetch(name, options = nil)
      options = merged_options(options)
      if options && options[:persisted_cache] == 'write'
        options.merge!(force: true)
      end
      super
    end
    ...
  end
end

ActiveSupport::Cache::Store.instance_eval do
  prepend PersistedCache::Extension
end
```

And when I hooked it up that way of course some specs started failing. However I'm glad they did because they alerted me to a side effect related to how I had been passing blocks. I would not have noticed this if I had not used super with prepend, so, thanks for the deprecation Rails core team.

There were other wrinkles. My colleague wanted to be able to delete keys. I was kind of opposed in principal (I'm from the never delete anything school) but, I didn't think the gem should share my prejudice so I added an option for that. He was also backfilling very old reports that people would probably never look at again, so they didn't need to be in the cache. I added an option for that. Then he wanted to be able to raise an error when an expected hash wasn't in the cache so we could tell users that a report was building. Added another option. Soon I had options that could conflict with each other and I raised exceptions in those cases. Blech. Eventually I realized the options could be streamlined and those are the ones that exist now. This was version 0.1.2 of the gem.

It's an acquired taste, but all in all I'm enjoying this dog food so far.