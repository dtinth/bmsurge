
require_relative './mpd'

mpd_status = $mpd.status
current_song_id = mpd_status[:songid]
elapsed_time = mpd_status[:time][0]

play_time = Time.now

$mpd.queue.each do |song|
  if elapsed_time
    if current_song_id == song.id
      play_time -= elapsed_time
    end
    elapsed_time = nil
  end
  p [ song.pos, play_time, song.file, song.id ]
  play_time += song.time[1]
end
