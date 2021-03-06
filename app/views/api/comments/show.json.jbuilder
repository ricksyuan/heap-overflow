json.comment do
  json.id @comment.id
  json.commentableType @comment.commentable_type
  json.commentableId @comment.commentable_id
  json.authorId @comment.author_id
  json.body @comment.body
  
  json.score @comment.score

  if current_user
    current_user_vote = @comment.votes.find_by(voter_id: current_user.id)  
    json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
  end
  
end