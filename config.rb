require 'autoprefixer-rails'

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true

activate :blog do |blog|
  blog.prefix = 'blog'
  blog.layout = 'blog_post'
  blog.permalink = '{title}.html'
  blog.summary_separator = /END_SUMMARY/
end

activate :directory_indexes
activate :meta_tags
activate :syntax

sprockets.append_path File.join "#{root}", "source/bower_components"
ignore 'bower_components/*'

page '/error.html', :directory_index => false

# Build-specific configuration
configure :build do
  activate :autoprefixer
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
  activate :relative_assets
end
