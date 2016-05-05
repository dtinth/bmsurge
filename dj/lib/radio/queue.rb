
require 'yaml'
require 'radio/song'

module Radio
  class Queue
    def initialize(filename)
      @filename = filename
    end

    def songs
      raise 'Not in a transaction' unless @open
      @songs
    end

    def songs=(songs)
      raise 'Not in a transaction' unless @open
      @songs = songs
    end

    def transaction
      raise 'Already open!' if @open
      begin
        @open = true
        filename = @filename
        old_yaml = File.exist?(filename) ? File.read(filename) : ''
        data = YAML.load(old_yaml) || { }
        @songs = (data[:songs] || [ ]).map { |item| Song.from_h(item) }
        yield
        new_data = { songs: @songs.map { |song| song.to_h } }
        new_yaml = new_data.to_yaml
        if new_yaml != old_yaml
          File.write(filename, new_yaml)
        end
      ensure
        @open = false
      end
    end
  end
end
