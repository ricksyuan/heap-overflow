
json.question do
  json.extract! @question, :id, :asker_id, :title, :body, :score, :tag_ids, :answer_ids, :comment_ids
  if current_user
    current_user_vote = @question.votes.find_by(voter_id: current_user.id)  
    json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
  end
  
end

json.tags do
  @question.tags.each do |tag|
    json.set! tag.id do
      json.id tag.id
      json.name tag.name
    end
  end
end



json.answers do
  @question.answers.each do |answer|
    json.set! answer.id do
      json.id answer.id
      json.answererId answer.answerer_id
      json.questionId answer.question_id
      json.score answer.score
      json.body answer.body

      if current_user
        current_user_vote = answer.votes.find_by(voter_id: current_user.id)
        json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
      end
    end
  end
end

json.comments do
  # Make partial
  @question.comments.each do |comment|
    json.set! comment.id do
      json.id comment.id
      json.commentableId comment.commentable_id
      json.commenterId comment.commenter_id
      json.body comment.body

      json.score comment.score

      if current_user
        current_user_vote = comment.votes.find_by(voter_id: current_user.id)  
        json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
      end
    end
  end
end


json.users do
  json.set! @question.asker.id do
    json.id @question.asker.id
    json.displayName @question.asker.display_name
  end
  @question.answerers.each do |answerer|
    json.set! answerer.id do
      json.id answerer.id
      json.displayName answerer.display_name
    end
  end
  
  @question.commenters.each do |commenter|
    json.set! commenter.id do
      json.id commenter.id
      json.displayName commenter.display_name
    end
  end  
end

