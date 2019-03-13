json.set! user.id do 
  json.extract! user, :id, :display_name, :reputation, :email
  badge_count = Hash.new{|h,k| h[k] = 0}
  user.badges.each do |badge|
    case badge.badge_type
    when 1
      badge_count["gold"] += 1
    when 2
      badge_count["silver"] += 1
    when 3
      badge_count["bronze"] += 1
    end
  end
  json.badgeCounts do
    json.bronze badge_count["bronze"]
    json.silver badge_count["silver"]
    json.gold badge_count["gold"]
  end
  
end