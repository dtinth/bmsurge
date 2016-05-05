require 'radio/logging'

module Radio
  class AutoDJ
    include Logging

    def initialize(queue_watcher:, refiller:)
      @queue_watcher = queue_watcher
      @refiller = refiller
    end

    # Runs the main logic, which refills songs!
    def process!
      if @queue_watcher.songs_running_out?
        logger.info 'Going to refill songs.'
        @refiller.refill!
      else
        logger.info 'Not refilling songs.'
      end
    end

    # Returns the time where songs should always be in this part!
    def station_queue_target(now)
      target = now

      # Round to next hour
      target += (60 - target.min) * 60 if target.min > 0

      # Add one more hour
      target += 3600

      # That’s it
      target
    end

    def log(text)
      puts text
    end
  end
end
