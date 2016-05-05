
require 'radio/sorter'

module Radio
  class Refiller
    def initialize(randomizer:, station:)
      @randomizer = randomizer
      @station = station
    end

    def refill!(now=Time.now)
      beginning_of_hour = Time.new(now.year, now.month, now.day, now.hour, 0, 0)
      hour_offset = now - beginning_of_hour
      refill_until = now - hour_offset + (hour_offset / 3600).ceil * 3600 + 3600
      refill_length = refill_until - @station.song_end_time
      songs = @randomizer.consume!(duration: refill_length)
      @station.add_songs!(Radio::Sorter.sort(songs))
    end
  end
end
