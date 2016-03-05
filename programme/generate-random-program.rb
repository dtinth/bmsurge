
allsongs = $stdin.readlines.map(&:strip).shuffle

allsongs.each_slice(25) do |slice|
  puts slice.sort_by { |name| File.basename(name).downcase.sub(/\].*/, '')
    .reverse }
  #.sub(/.e$/, '').gsub(/[aeiou]/, '')
end
