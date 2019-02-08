json.answer do
  json.extract! @answer, :id, :answerer_id, :question_id, :body, :comment_ids
  json.score @answer.score
end