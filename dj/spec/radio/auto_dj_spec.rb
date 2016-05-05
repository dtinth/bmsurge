require 'radio/auto_dj'

describe Radio::AutoDJ do
  it 'should refill song if songs are running out' do
    queue_watcher = instance_spy('Radio::StationQueueWatcher', songs_running_out?: true)
    refiller = instance_spy('Radio::Refiller', refill!: true)
    dj = Radio::AutoDJ.new(queue_watcher: queue_watcher, refiller: refiller)
    dj.process!
    expect(refiller).to have_received(:refill!)
  end

  it 'should not refill song if songs are not running out' do
    queue_watcher = instance_spy('Radio::StationQueueWatcher', songs_running_out?: false)
    refiller = instance_spy('Radio::Refiller', refill!: true)
    dj = Radio::AutoDJ.new(queue_watcher: queue_watcher, refiller: refiller)
    dj.process!
    expect(refiller).not_to have_received(:refill!)
  end
end
