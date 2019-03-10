@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :email_hash, :display_name, :reputation, :location, :email_hash
  end
end