json.comment do
  json.id @comment.id
  json.commentableType @comment.commentable_type
  json.commentableId @comment.commentable_id  
end