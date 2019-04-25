
json.questions(@questions) do |question|
  json.id question.id
  json.authorId question.author_id
  json.title question.title
  json.score question.score
  json.views question.views
  json.tagIds question.tag_ids
  json.answerIds question.answer_ids
  json.createdAt question.created_at
end

json.users do
  @questions.each do |question|
    json.partial! "api/questions/user", user: question.author
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

json.page do
  json.pageNum @page
  json.totalPages @total_pages
end