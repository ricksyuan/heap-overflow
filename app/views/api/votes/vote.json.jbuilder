json.set! @field do
  json.set! @vote.votable_id do
    json.score @score
  end
end