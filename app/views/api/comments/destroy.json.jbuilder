json.comment do
  # TODO: extract comment fields out into a partial.
  json.id @comment.id
  json.commentableType @comment.commentable_type
  json.commentableId @comment.commentable_id  
end