json.set! user.id do 
  json.extract! user, :id, :display_name, :reputation, :email
end
