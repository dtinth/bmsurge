

def approximate_travelling_salesman (delegate)
  points = delegate.points
  total_cost = lambda do |path|
    [ *path, path.first ].each_cons(2).map { |a, b| delegate.distance(a, b) }.reduce(&:+)
  end
  instance = lambda do |path|
    { path: path, cost: total_cost[path] }
  end
  mutate = lambda do |path|
    return path.shuffle if rand(10) >= 9
    return path if rand(10) >= 3
    path = path.dup
    i = rand(path.length)
    j = rand(path.length)
    path[i], path[j] = path[j], path[i]
    path
  end
  swarm = 200.times.map { instance[points.shuffle] }
  start = Time.now
  best_min = nil
  loop do
    break if Time.now - start >= 5
    100.times do
      parent_a, parent_b = swarm.sample(2)
      cut_point = rand(parent_a[:path].length + 1)
      child1_path = parent_a[:path].take(cut_point)
      child1_path += parent_b[:path] - child1_path
      child2_path = parent_b[:path].take(cut_point)
      child2_path += parent_a[:path] - child2_path
      swarm << instance[mutate[child1_path]] << instance[mutate[child2_path]]
    end
    cur_min = swarm.map { |c| c[:cost] }.min
    if !best_min || cur_min < best_min
      $stderr.puts cur_min
      best_min = cur_min
    end
    swarm = swarm.sort_by { |c| c[:cost] }.take(200)
  end
  swarm.min_by { |c| c[:cost] }[:path]
end

instance = Object.new

class Problem
  def initialize(songs)
    @songs = songs
  end
  def points
    @songs
  end
  def genre_of(x)
    ($genre_cache ||= { })[x] ||= x[/\[[^\[\]]+/].downcase.chars.uniq
  end
  def diff_between(a, b)
    i = a & b
    a.length - i.length + b.length - i.length
  end
  def score_between(a, b)
    (a & b).length / (a | b).length.to_f
  end
  def distance(a, b)
    (@dist_cache ||= { })[[ a, b ]] ||= diff_between(genre_of(a), genre_of(b))
  end
  def score(a, b)
    (@dist_cache ||= { })[[ a, b ]] ||= score_between(genre_of(a), genre_of(b))
  end
end

def greedy(problem)
  problem.points.map { |starting_point|
    selected = [ starting_point ]
    available = problem.points - selected
    cost = 0.0
    until available.empty?
      last = selected.last
      next_selected = available.max_by { |x| problem.score(last, x) }
      cost += problem.score(last, next_selected)
      available -= [ next_selected ]
      selected << next_selected
    end
    { cost: cost, songs: selected }
  }
  .max_by { |x| x[:cost] }[:songs]
end

allsongs = $stdin.readlines.map(&:strip).shuffle

allsongs.each_slice(25) do |slice|
  puts greedy(Problem.new(slice))
  # puts slice.sort_by { |name| File.basename(name).downcase.sub(/\].*/, '') .reverse }
  #.sub(/.e$/, '').gsub(/[aeiou]/, '')
end
