require 'ruby-mpd'
require 'radio/song'
require 'radio/logging'

module Radio
  class Station
    include Logging

    def song_end_time
      logger.info "Computing song_end_time..."
      use_mpd do |mpd|
        mpd_status = mpd.status
        current_song_id = mpd_status[:songid]
        elapsed_time = mpd_status[:time][0]
        play_time = Time.now
        queue = mpd.queue
        logger.info "There are #{queue.length} songs in station’s queue."
        queue.each do |song|
          if elapsed_time
            if current_song_id == song.id
              play_time -= elapsed_time
            end
            elapsed_time = nil
          end
          play_time += song.time[1]
        end
        play_time
      end
    end

    def available_songs
      logger.info "Loading available songs..."
      use_mpd do |mpd|
        songs = mpd
          .songs
          .select { |song| song.file && song.time }
          .map { |song| Radio::Song.new(song.file, song.time[1]) }
        logger.info "Loaded #{songs.length} songs"
        songs
      end
    end

    def add_songs!(songs)
      use_mpd do |mpd|
        songs.each do |song|
          logger.info "Adding #{song.filename} to station queue..."
          mpd.add(song.filename)
        end
      end
    end

    private
    def use_mpd
      host = (ENV['MPD_HOST'] || 'localhost').split('@')
      mpd = MPD.new(host.last, (ENV['MPD_PORT'] || '6600').to_i, password: host.length >= 2 ? host.first : nil)
      mpd.connect
      logger.info "Connected to mpd"
      yield mpd
    ensure
      mpd.disconnect
      logger.info "Disconnected from mpd"
    end
  end
end
