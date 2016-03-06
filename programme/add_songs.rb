
require_relative './mpd'

song_files_to_add = [ ]

$mpd.where(album: 'GENRE SHUFFLE 3').each do |song|
  song_files_to_add << song.file
end

song_files_to_add.shuffle!

song_files_to_add.reverse_each do |file|
  p [ $mpd.addid(file, 46), file ]
end
