use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['admin', 'pass']
end

use Rack::Static,
  :urls => ["/images", "/scripts", "/styles", "/views", "/data", "/fonts"],
  :root => "www"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('www/index.html', File::RDONLY)
  ]
}
