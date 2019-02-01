json.set! @votable.class.name.downcase do
  json.set! @votable.id do
    json.score @votable.score

    if current_user
      current_user_vote = @votable.votes.find_by(voter_id: current_user.id)
      json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
    end
  end
end