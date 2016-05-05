require 'radio/sorter'
require 'radio/song'

describe 'Radio::Sorter' do
  describe '::sort' do
    it 'should sort song' do
      songs = [
        Radio::Song.new('[AAAA].mp3', 5),
        Radio::Song.new('[BBBB].mp3', 5),
        Radio::Song.new('[AABB].mp3', 10)
      ]
      100.times do
        sorted = Radio::Sorter.sort(songs.shuffle)
        sorted_names = sorted.map(&:filename)
        case sorted_names[0]
        when '[AAAA].mp3'
          expect(sorted_names[1]).to eq('[AABB].mp3')
          expect(sorted_names[2]).to eq('[BBBB].mp3')
        when '[BBBB].mp3'
          expect(sorted_names[1]).to eq('[AABB].mp3')
          expect(sorted_names[2]).to eq('[AAAA].mp3')
        else
          raise 'BAD'
        end
      end
    end
  end
end
