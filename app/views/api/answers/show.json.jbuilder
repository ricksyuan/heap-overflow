json.answer do
  json.set! @answer.id do
    json.extract! @answer, :id, :answerer_id, :question_id, :body, :comment_ids
    json.score @answer.score
  end
end

json.comments do
  @answer.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :commenter_id, :commentable_type, :commentable_id
      json.score comment.score

      if current_user
        current_user_vote = comment.votes.find_by(voter_id: current_user.id)  
        json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
      end
    end
  end
end


json.user do
  json.set! @answer.answerer_id do
    json.extract! @answer.answerer, :id, :display_name
  end
  # @answer.comments.commenters each do |commenter|
  # end
end