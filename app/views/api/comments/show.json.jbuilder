json.comment do
  # TODO: extract comment fields out into a partial.
  # TODO: it is also reused in the show question.
  json.id @comment.id
  json.commentableType @comment.commentable_type
  json.commentableId @comment.commentable_id
  json.commenterId @comment.commenter_id
  json.body @comment.body
  
  json.score @comment.score

  if current_user
    current_user_vote = @comment.votes.find_by(voter_id: current_user.id)  
    json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
  end
  
end