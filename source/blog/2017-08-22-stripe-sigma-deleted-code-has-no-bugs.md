---
title: "Stripe Sigma: Deleted code has no bugs."
description: Replacing Amazon Athena with Stripe Sigma for querying TaxJar metrics.
author: bernd_ustorf
date: 2017-08-22 12:00 UTC
category: Stripe
tags: stripe, metrics, analytics
published: true
---

At [TaxJar](https://www.taxjar.com/), our goal is to make sales tax compliance easy. Executing on this ambition while staying lean requires above-average efficiency. We do a lot with a little by being data-driven. Naturally we use Stripe for payments. We could have written our own payments code, but we wanted to write sales tax code. And the [Stripe API](https://stripe.com/docs/api) is just so... pretty. That was an easy decision. (They’re not all like that). 

The imperative in the early days was to get high-level metrics with as little work as possible. Boom! [Stripe webhooks.](https://stripe.com/docs/webhooks) (Okay, that was another easy one). We saved these to our Application database and exposed them in a lightweight admin. This gave us enough insight into conversions, churn and revenue to make decisions for years.

But as TaxJar grew, decisions got harder, and our need to be data driven became even more pressing. My crude measure of this is the “Hey Bernd” Index (HBI). For the first few years at TaxJar, when people yelled things in the chat like <q>Hey Bernd, how many customers are enrolled in [AutoFile](https://www.taxjar.com/autofile/)?</q> or <q>Hey Bernd, how much sales tax did we remit to California last year?</q> I would query app and webhook data from the DB to answer in real time. The “Hey Bernd’s” never piled up — *HBI == 0*.

END_SUMMARY

![Hey Bernd Index == 0](/images/blog/stripe-sigma-deleted-code-has-no-bugs/hbi-zero.jpg)

Some time in the last year, HBI hit an inflection point. I started getting questions like:

> “Hey Bernd, how many AutoFile enrollees collected sales tax in California last month?”

This sort of question required one off code and iteration on queries that took an hour or more per run — *HBI > 0*.

![Hey Bernd Index > 0](/images/blog/stripe-sigma-deleted-code-has-no-bugs/hbi-greater-than-zero.jpg)

Our decision making ability was impeded. To address this, I first tried [Amazon Redshift](https://aws.amazon.com/redshift/). By dumping CSV from our app database to S3 and loading it into Redshift, I was able to provision the data and run any query quickly. This was amazing.  Our team at TaxJar was happy to get new answers. 

Each answer spawned two new “Hey Bernd’s” though. Each one meant the same ETL work — query the data from our app DB or an external API, save it in CSV or JSON to S3, then load it into Redshift. I got quick at doing this, but HBI actually started climbing even faster than before.

One night I got a question from the CEO that I couldn’t answer:

> “Hey Bernd, what's our revenue mix between AutoFile and monthly subscriptions?”

The AutoFile charges were saved as invoice items on the Stripe invoice. In order to answer the question, I would have to reprocess data on S3 to load it into Redshift — at least hours, possibly a day worth of work on a task that was not prioritized. I hate questions I can’t answer, but I hate unprioritized work even more.

Then it dawned on me. I was using a wizard in [Amazon Athena](https://aws.amazon.com/athena/) to create a simple table from my CSV and JSON data which I queried with SQL to look for duplicates. ([Redshift doesn’t enforce primary keys](http://docs.aws.amazon.com/redshift/latest/dg/t_Defining_constraints.html)). I knew that Athena [could do more](http://docs.aws.amazon.com/athena/latest/ug/creating-tables.html) without the wizard though. After some late night hours I had it — I was able to query the CSV data in place on S3 without having to load it to Redshift.

HBI went down. I created Athena tables to read all of the CSV and JSON that I had stored on S3 and I cut Redshift out of the picture. I was very pleased with myself and finishing up this effort when I learned about [Stripe Sigma](https://stripe.com/us/sigma). 😳

![Stripe Sigma](/images/blog/stripe-sigma-deleted-code-has-no-bugs/stripe-sigma.png)

Sigma was quite interesting to me to say the least. I had just finished loading Stripe data into an architecture which allowed me to query it quickly using regular SQL. Sigma offered literally the same thing. Of course I checked it out immediately (and somewhat nervously).

I felt like a cold-war engineer examining the MiG of a Soviet defector. What I saw was strange, familiar and awesome. The German side of me was so interested in the engineering I completely forgot it rendered months of my own work redundant.

![Ausgezeichnet!](/images/blog/stripe-sigma-deleted-code-has-no-bugs/ausgezeichnet.jpg)

I was able to run the queries I had created for our home-grown system with small modifications. It was performant and it gave access to all of the Stripe schema — even the parts I didn’t know if I would need. This is critical, because being able to explore the data without any setup time leads to paths you could never have known of.

After a quiet moment, I wiped away a single tear (more than one would have been a sign of weakness) and I did what any good engineer would do. I deleted my code and started pulling our data from Stripe Sigma instead. 

**Now, with one Sigma query, I'm able to transform data from Stripe Subscriptions: invoices, invoice items, charges, and more into just the structure I want using SQL `WITH` clauses.** I run this once a day from the Sigma web interface, then I upload the CSV file it gives me to S3. From there I can SQL `JOIN` to data from our app like home state, transaction volume and filing history in order to answer any question the TaxJar team can come up with. 

Instead of doing the grunt work of persisting thousands of JSON files to S3 every day and ensuring that’s running smoothly, I’m able to spend more time analyzing the data. (HBI is heading back down again, though something tells me the days of zero are over). Moreover, Sigma’s examples showed me the best parts of [Presto](https://prestodb.io/) applied directly to the Stripe Schema. One would be hard pressed to find a better place to study big-data-fu from the masters. Perhaps best of all, no one will ever know if the code I deleted had bugs in it or not. 😜