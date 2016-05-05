require 'radio/randomizer'
require 'radio/song'

describe 'Radio::Randomizer' do
  describe '#consume!' do
    it 'should return random songs, given length' do
      queue = FakeQueue.new([
        Radio::Song.new('A.mp3', 5),
        Radio::Song.new('B.mp3', 10),
        Radio::Song.new('C.mp3', 5),
        Radio::Song.new('D.mp3', 8),
        Radio::Song.new('E.mp3', 4),
      ])
      station = instance_double('Radio::Station')
      randomizer = Radio::Randomizer.new(queue: queue, station: station)
      songs = randomizer.consume!(duration: 20)
      song_filenames = songs.map(&:filename).sort
      expect(song_filenames).to eq([
        'A.mp3', 'B.mp3', 'C.mp3'
      ])
    end

    it 'should generate a new random batch each time' do
      queue = FakeQueue.new([
        Radio::Song.new('A.mp3', 5),
        Radio::Song.new('B.mp3', 5),
        Radio::Song.new('C.mp3', 5),
        Radio::Song.new('D.mp3', 5),
        Radio::Song.new('E.mp3', 5),
      ])
      station = instance_double('Radio::Station')
      randomizer = Radio::Randomizer.new(queue: queue, station: station)
      songs_1 = randomizer.consume!(duration: 10)
      songs_2 = randomizer.consume!(duration: 10)
      expect(songs_1).not_to eq(songs_2)
    end

    it 'should refill songs from station in a round-robin manner' do
      queue = FakeQueue.new([ ])
      available_songs = [
        Radio::Song.new('A.mp3', 5),
        Radio::Song.new('B.mp3', 5),
        Radio::Song.new('C.mp3', 5),
      ]
      station = instance_double('Radio::Station', available_songs: available_songs)
      randomizer = Radio::Randomizer.new(queue: queue, station: station)
      songs = randomizer.consume!(duration: 30)
      expect(songs.length).to eq(6)

      filenames = songs.map(&:filename)
      expect(filenames.count('A.mp3')).to eq(2)
      expect(filenames.count('B.mp3')).to eq(2)
      expect(filenames.count('C.mp3')).to eq(2)
    end

    class FakeQueue
      def initialize(songs)
        @songs = songs
      end

      def songs
        raise unless @in_transaction
        @songs
      end

      def songs=(songs)
        raise unless @in_transaction
        @songs = songs
      end

      def transaction
        raise if @in_transaction
        @in_transaction = true
        yield
      ensure
        @in_transaction = false
      end
    end
  end
end
