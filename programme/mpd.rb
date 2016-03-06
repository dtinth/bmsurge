
require 'ruby-mpd'

host = (ENV['MPD_HOST'] || 'localhost').split('@')
$mpd = MPD.new(host.last, (ENV['MPD_PORT'] || '6600').to_i, password: host.length >= 2 ? host.first : nil)
$mpd.connect
