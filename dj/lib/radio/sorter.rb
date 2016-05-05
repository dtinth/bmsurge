
module Radio
  module Sorter
    class Problem
      def initialize(songs)
        @songs = songs
      end
      def charlist(str)
        (@@charlist_cache ||= { })[str] ||= str.downcase.chars.uniq.sort
      end
      def score_between(a, b)
        (a & b).length / [ 1.0, (a | b).length.to_f ].max
      end
      def score(a, b)
        (@dist_cache ||= { })[[ a, b ]] ||= score_between(charlist(a.genre), charlist(b.genre))
      end
      def solution
        @songs.map { |starting_point|
          selected = [ starting_point ]
          available = @songs - selected
          current_score = 0.0
          until available.empty?
            last = selected.last
            next_selected = available.max_by { |x| score(last, x) }
            current_score += score(last, next_selected)
            available -= [ next_selected ]
            selected << next_selected
          end
          { score: current_score, songs: selected }
        }
        .max_by { |x| x[:score] }[:songs]
      end
    end

    def self.sort(songs)
      Problem.new(songs).solution
    end
  end
end
