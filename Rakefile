abort('Please run this using `bundle exec rake`') unless ENV["BUNDLE_BIN_PATH"]
require 'html-proofer'

def build_site
  sh "bundle exec jekyll build -d ./_site/strata/$TRAVIS_BRANCH"
end

def html_proofer
  options = {
    :check_sri => true,
    :check_external_hash => true,
    :check_html => true,
    :check_img_http => true,
    :check_opengraph => true,
    :cache => {
      :timeframe => '6w'
    },
    :typhoeus => {
      :connecttimeout => 20,
      :timeout => 30,
      :verbose => true,
      :ssl_verifypeer => false,
      :ssl_verifyhost => 0
    }
  }
  HTMLProofer.check_directory("./_site", options).run
end

task :test do
  build_site
  html_proofer
end

task :default => :test
