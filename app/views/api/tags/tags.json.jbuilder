json.tags do
  @tags.each do |tag|
    json.set! tag.id do
      json.id tag.id
      json.name tag.name
    end
  end
end