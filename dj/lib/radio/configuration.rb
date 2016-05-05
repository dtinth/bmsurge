
require 'radio/auto_dj'
require 'radio/queue'
require 'radio/randomizer'
require 'radio/station'
require 'radio/station_queue_watcher'
require 'radio/refiller'

module Radio
  class Configuration
    def station
      @station ||= Radio::Station.new
    end

    def queue_watcher
      @queue_watcher ||= Radio::StationQueueWatcher.new(station: station)
    end

    def queue
      @queue ||= Radio::Queue.new(ENV['QUEUE_FILE'] || '/tmp/songs.txt')
    end

    def randomizer
      @randomizer ||= Radio::Randomizer.new(station: station, queue: queue)
    end

    def refiller
      @refiller ||= Radio::Refiller.new(station: station, randomizer: randomizer)
    end

    def auto_dj
      @auto_dj ||= Radio::AutoDJ.new(queue_watcher: queue_watcher, refiller: refiller)
    end
  end
end
