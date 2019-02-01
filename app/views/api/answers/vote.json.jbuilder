json.answer do
  json.set! @answer.id do
    json.score @answer.score
    
    if current_user
      current_user_vote = @answer.votes.find_by(voter_id: current_user.id)
      json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
    end
  end
end