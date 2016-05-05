require 'radio/song'

describe 'Radio::Song' do
  def genre_of(filename)
    Radio::Song.new(filename, 99).genre
  end
  describe '.genre' do
    it { expect(genre_of('BOF/[TRANCE] Song.mp3')).to eq 'TRANCE' }
    it { expect(genre_of('BOF/[ DnB ] test.mp3')).to eq 'DnB' }
  end
end
