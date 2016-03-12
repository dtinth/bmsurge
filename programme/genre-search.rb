
require_relative './mpd'

songs = $mpd
.where(genre: ARGV[0])

duration = 0
count = 0

songs
.select { |song| song.file && song.time }
.each do |song|
  duration += song.time[1]
  count += 1
end

puts "Total songs:"
puts count
puts

puts "Total duration:"
duration_s = "#{duration / 3600}h#{(duration / 60) % 60}m"
puts duration_s
