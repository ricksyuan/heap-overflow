json.answer do
  json.set! @answer.id do
    json.extract! @answer, :id, :body, :answerer_id, :question_id
    json.score @answer.score
  end
end

json.user do
  json.set! @answer.answerer_id do
    json.extract! @answer.answerer, :id, :display_name
  end
end