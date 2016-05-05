
require 'radio/logging'

module Radio
  class StationQueueWatcher
    include Logging

    def initialize(station:)
      @station = station
    end

    def songs_running_out?
      end_time = @station.song_end_time
      threshold = (Time.now + 2700)
      logger.info "Songs will run out on #{end_time} (threshold: #{threshold})"
      end_time < threshold
    end
  end
end
