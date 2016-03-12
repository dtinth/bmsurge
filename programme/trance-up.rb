
# Before running: mpc -f '%time%\t%comment%\t%file%' search genre trance
raise "Data not found" unless File.exist?('/tmp/trance.txt')

require 'json'
require 'pathname'

bpms = JSON.parse(File.read(Pathname.new(__FILE__).parent.parent.join('data/bpm.json')))

class Song < Struct.new(:duration, :bpm, :file)
end

songs = [ ]

File.readlines('/tmp/trance.txt').each do |line|
  time, info, file = line.strip.split("\t")
  next unless info =~ /md5=(\w+)/
  md5 = $1
  next unless time =~ /(\d+):(\d+)/
  duration = $1.to_i * 60 + $2.to_i
  next unless bpm_info = bpms[md5]
  next if bpm_info['min'] != bpm_info['max']
  songs << Song.new(duration, bpm_info['min'], file)
end

def each_show(songs, stop_when)
  original_songs = songs
  loop do
    show_duration = 0
    can_take_more = proc do |song|
      if stop_when <= show_duration
        false
      else
        show_duration += song.duration
        true
      end
    end
    show_songs = songs.take_while(&can_take_more)
    last_episode = show_songs.length === songs.length
    if last_episode
      show_songs += (original_songs.shuffle - show_songs).take_while(&can_take_more)
    end
    yield show_songs
    songs = songs.drop(show_songs.length)
    break if last_episode
  end
end

# puts songs.length
# puts songs.map(&:duration).reduce(&:+)

episode = 1
each_show(songs.shuffle, 90 * 60) do |songs|
  File.open("trance-up/#{episode}.txt", 'w') do |f|
    f.puts songs.sort_by(&:bpm).map(&:file)
  end
  File.open("trance-up/#{episode}.nfo", 'w') do |f|
    f.puts songs.sort_by(&:bpm)
  end
  puts songs.map(&:duration).reduce(&:+)
  episode += 1
end
