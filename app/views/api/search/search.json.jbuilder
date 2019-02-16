if @questions.length == 0
  json.questions({})
else
  json.questions do
    @questions.each do |question|
      json.set! question.id do
        json.id question.id
        json.askerId question.asker_id
        json.title question.title
        json.answerCount question.answers.length
        json.score question.score
        json.views question.views
        json.tagIds question.taggings.pluck(:tag_id)
        json.answerIds question.answer_ids

      end
    end
  end
end

if @questions.length == 0
  json.users({})
else
  json.users do
    @questions.each do |question|
      json.set! question.asker.id do 
        json.extract! question.asker, :id, :display_name
      end
    end
  end
end


tag_count = 0
json.tags do
  @questions.each do |question|
    question.tags.each do |tag|
      tag_count += 1
      json.set! tag.id do
        json.id tag.id
        json.name tag.name
      end
    end
  end
end

if tag_count == 0
  json.tags({})
end

json.query do
  json.type @query_type
  json.parsedString @query_string
end