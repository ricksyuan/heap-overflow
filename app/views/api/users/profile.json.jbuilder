json.user do
  json.extract! @user, :id, :email, :display_name, :reputation
end

json.questions do
  @questions.each do |question|
    json.set! question.id do
      json.extract! question, :id, :title, :asker_id
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