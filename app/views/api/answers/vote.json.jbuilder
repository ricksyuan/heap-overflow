json.answer do
  json.set! @answer.id do
    json.score @answer.score
  end
end