
json.questions do
  @questions.each do |question|
    json.set! question.id do
      json.id question.id
      json.askerId question.asker_id
      json.title question.title
      json.answerCount question.answers.length
      json.score question.score
      json.views question.views
      json.tag_ids question.taggings.pluck(:tag_id)
      json.answerIds question.answer_ids

    end
  end
end


json.users do
  @questions.each do |question|
    json.set! question.asker.id do 
      json.extract! question.asker, :id, :display_name
    end
  end
end

json.tags do
  @questions.each do |question|
    question.tags.each do |tag|
      json.set! tag.id do
        json.id tag.id
        json.name tag.name
      end
    end
  end
end