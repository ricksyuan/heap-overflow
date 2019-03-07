
json.question do
  json.extract! @question, :id, :asker_id, :title, :body, :score, :tag_ids, :answer_ids, :comment_ids
  if current_user
    current_user_vote = @question.votes.find_by(voter_id: current_user.id)  
    json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
  end
  
end

if @question.tags.length == 0
  json.tags({})
else
  json.tags do
    @question.tags.each do |tag|
      json.set! tag.id do
        json.id tag.id
        json.name tag.name
      end
    end
  end
end

if @question.answers.length == 0
  json.answers({})
else
  json.answers do
    @question.answers.each do |answer|
      json.set! answer.id do
        json.id answer.id
        json.answererId answer.answerer_id
        json.questionId answer.question_id
        json.score answer.score
        json.body answer.body
        json.commentIds answer.comment_ids

        if current_user
          current_user_vote = answer.votes.find_by(voter_id: current_user.id)
          json.currentUserVote current_user_vote ? current_user_vote.vote_type : "none"
        end
      end
    end
  end
end

comment_count = 0
json.comments do
  # TODO: Make partial
  @question.comments.each do |comment|
    json.set! comment.id do
      comment_count += 1
      json.id comment.id
      json.commentableType comment.commentable_type
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
  @question.answers.each do |answer|
    answer.comments.each do |comment|
      comment_count += 1
      json.set! comment.id do
        json.id comment.id
        json.commentableType comment.commentable_type
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
end

if comment_count == 0
  json.comments({})
end

json.users do  
  
  json.partial! "api/questions/user", user: @question.asker

  @question.answerers.each do |answerer|
    json.partial! "api/questions/user", user: answerer
  end
  
  @question.commenters.each do |commenter|
    json.partial! "api/questions/user", user: commenter
  end

  @question.answers.each do |answer|
    answer.comments.each do |comment|
      json.partial! "api/questions/user", user: comment.commenter
    end
  end

end

