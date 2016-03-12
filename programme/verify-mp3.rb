
require 'taglib'

Dir['/Users/dtinth/Music/BMS Music/Be-Music Songs/**/*.mp3'].each do |mp3|
  TagLib::MPEG::File.open(mp3) do |fref|
    tag = fref.id3v2_tag
    puts tag.comment
  end
end
