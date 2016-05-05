
module Radio
  class Song < Struct.new(:filename, :duration)
    def self.from_h(hash)
      new(hash[:filename], hash[:duration])
    end

    def genre
      @genre ||= (filename[/\[[^\[\]]+/] || 'NO GENRE').sub(/^\[/, '').strip
    end

    def to_h
      { filename: filename, duration: duration }
    end
  end
end
