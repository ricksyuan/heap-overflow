json.user do
  json.extract! @user, :id, :email_hash, :display_name, :reputation
end

json.questions do
  @questions.each do |question|
    json.set! question.id do
      json.extract! question, :id, :title, :asker_id, :score
    end
  end

  @answers.each do |answer|
    json.set! answer.question_id do
      json.extract! answer.question, :id, :title, :asker_id
      json.answerScore answer.score
    end
  end
end

json.answers do
  @answers.each do |answer|
    json.set! answer.id do
      json.extract! answer, :id, :answerer_id, :question_id
    end
  end
end