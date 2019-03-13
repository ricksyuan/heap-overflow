
page_user_ids = []
json.users do
  @users.each do |user|
    json.set! user.id do
      # json.extract! user, :id, :email_hash, :display_name, :reputation, :location, :email_hash, :badges
      json.extract! user, :id, :email_hash, :display_name, :reputation, :location, :email_hash
      json.badges(user.badges) do |badge|
        json.badgeType badge.badge_type
        json.name
      end


    end

    page_user_ids.push(user.id)

  end
end

json.page do
  json.pageNum @page
  json.pageUserIds page_user_ids
  json.totalPages @total_pages
end