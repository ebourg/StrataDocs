abort('Please run this using `bundle exec rake`') unless ENV["BUNDLE_BIN_PATH"]
require 'html-proofer'

desc "Test the website"
task :test => [:build, 'html:check'] do
  options = {
    :check_sri => true,
    :check_external_hash => true,
    :check_html => true,
    :check_img_http => true,
    :check_opengraph => true,
    :ssl_verifyhost: 0,
    :cache => {
      :timeframe => '6w'
    }
  }
  begin
    HTMLProofer.check_directory(".", options).run
  rescue => msg
    puts "#{msg}"
  end
end

task :default => [:test]
