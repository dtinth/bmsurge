require 'radio/refiller'
require 'radio/station'
require 'radio/song'

describe 'Radio::Refiller' do
  let(:song1) { Radio::Song.new('[TRANCE] song1.mp3', 100) }
  let(:song2) { Radio::Song.new('[ELECTRO] song2.mp3', 100) }
  let(:song3) { Radio::Song.new('[TRANCE] song3.mp3', 100) }

  it 'should refill song from the long-term queue into the station' do
    randomizer = instance_double('Radio::Randomizer')
    allow(randomizer).to receive(:consume!).and_return([ song1, song2, song3 ])

    station = instance_spy('Radio::Station', song_end_time: Time.now)

    refiller = Radio::Refiller.new(randomizer: randomizer, station: station)
    refiller.refill!

    expect(station).to have_received(:add_songs!).with([ song1, song3, song2 ])
  end

  it 'should refill song to the end of next hour' do
    now = Time.new(2016, 5, 2, 23, 20, 20)
    song_end_time = Time.new(2016, 5, 3, 0, 20, 0)
    expected_time = Time.new(2016, 5, 3, 1, 0, 0)
    expected_length = expected_time - song_end_time

    randomizer = instance_spy('Radio::Randomizer')
    allow(randomizer).to receive(:consume!).and_return([ song1, song2, song3 ])

    station = instance_spy('Radio::Station', song_end_time: song_end_time)

    refiller = Radio::Refiller.new(randomizer: randomizer, station: station)
    refiller.refill!(now)

    expect(randomizer).to have_received(:consume!).with(duration: expected_length)
  end
end
