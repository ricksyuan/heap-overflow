json.question do 
  json.set! @question.id do
    json.extract! @question, :id, :asker_id, :title, :body, :score
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
      json.score answer.score
      json.body answer.body
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
end

