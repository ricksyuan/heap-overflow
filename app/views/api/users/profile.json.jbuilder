json.user do
  json.extract! @user, :id, :email_hash, :display_name, :reputation, :badge_counts
  json.badges(@user.badges) do |badge|
    json.name badge.name
    json.badgeType badge.badge_type
  end
end


if @questions.length == 0
  json.questions({})
else 
  json.questions do
    @questions.each do |question|
      json.set! question.id do
        json.extract! question, :id, :title, :author_id, :score
      end
    end

    @answers.each do |answer|
      json.set! answer.question_id do
        json.extract! answer.question, :id, :title, :author_id
        json.answerScore answer.score
      end
    end
  end
end


json.answers(@answers) do |answer|
  json.set! answer.id do
    json.extract! answer, :id, :author_id, :question_id
  end
end