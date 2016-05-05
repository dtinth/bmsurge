
require 'radio/logging'

module Radio
  class Randomizer
    include Logging

    def initialize(queue:, station:)
      @queue = queue
      @station = station
    end

    def consume!(duration:)
      duration_so_far = 0
      songs = [ ]
      logger.info "#{duration} seconds of songs requested."
      @queue.transaction do
        until duration_so_far >= duration
          ensure_queue_has_songs_left!
          song = @queue.songs.shift
          songs << song
          duration_so_far += song.duration
        end
      end
      logger.info "Consumed #{songs.length} songs, totalling #{duration_so_far} seconds."
      songs
    end

    private
    def ensure_queue_has_songs_left!
      return unless @queue.songs.empty?
      available_songs = @station.available_songs
      logger.info "Queue has become empty. Refilling with #{available_songs.length} more songs."
      @queue.songs = available_songs.shuffle
    end
  end
end
