require 'autoprefixer-rails'

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

sprockets.append_path File.join "#{root}", "source/bower_components"

# Build-specific configuration
configure :build do
  activate :autoprefixer
  activate :minify_css
  activate :minify_javascript
  # activate :asset_hash
  # activate :relative_assets
end
