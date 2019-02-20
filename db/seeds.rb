# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'nokogiri'
require 'faker'
require 'csv'

# Clear existing data
User.delete_all
Question.delete_all
Tag.delete_all
Answer.delete_all
Tagging.delete_all
Vote.delete_all
Comment.delete_all


# Create demo user
demo_user = User.create!(
  display_name: 'demouser',
  email: 'demo@example.com',
  password: "password"
)
# Create users
users = []
8.times do |i|
  display_name = Faker::TvShows::SiliconValley.unique.character
  email = "#{display_name.split(' ').join('.')}@example.com"
  users.push(User.create!(display_name: display_name, email: email, password: 'password'));
end

#  Create questions
questions_table = CSV.foreach(File.join(__dir__, 'seed_questions.csv'), headers: true) do |question_row|
  # Id	PostTypeId	AcceptedAnswerId	ParentId	CreationDate	DeletionDate	Score	ViewCount	Body	OwnerUserId	OwnerDisplayName	LastEditorUserId	LastEditorDisplayName	LastEditDate	LastActivityDate	Title	Tags	AnswerCount	CommentCount	FavoriteCount	ClosedDate	CommunityOwnedDate
  id = question_row['Id'].to_i
  title = question_row['Title']
  asker_id = users.sample.id.to_i
  editor_id = asker_id
  views = question_row['ViewCount'].to_i
  body = question_row['Body']
  created_at = question_row['CreationDate']
  updated_at = question_row['LastEditDate']
  answers_count = question_row['AnswerCount'].to_i
  score = question_row['Score'].to_i
  Question.create!(id: id, title: title, asker_id: asker_id, editor_id: editor_id, views: views, body: body, created_at: created_at, updated_at: updated_at, answers_count: answers_count, score: score)
end

# Create answers
CSV.foreach(File.join(__dir__, 'seed_answers.csv'), headers: true) do |answer_row|
  id = answer_row['Id'].to_i
  question_id = answer_row['ParentId'].to_i
  answerer_id = users.sample.id.to_i
  score = users.sample.id.to_i
  editor_id = answerer_id
  body = answer_row['Body']
  created_at = answer_row['CreationDate']
  updated_at = answer_row['LastEditDate']
  score = answer_row['Score'].to_i
  Answer.create!(id: id, question_id: question_id, answerer_id: answerer_id, editor_id: editor_id, body: body, created_at: created_at, updated_at: updated_at, score: score)
end

# Create comments on questions
CSV.foreach(File.join(__dir__, 'seed_question_comments.csv'), headers: true) do |comment_row|
  # Id	PostId	Score	Text	CreationDate	UserDisplayName	UserId
  id = comment_row['Id'].to_i
  commenter_id = users.sample.id.to_i
  commentable_type = 'Question'
  commentable_id = comment_row['PostId'].to_i
  body = comment_row['Text']
  created_at = comment_row['CreationDate']
  updated_at = created_at
  score = comment_row['Score'].to_i
  Comment.create!(id: id, commenter_id: commenter_id, commentable_type: commentable_type, commentable_id: commentable_id, body: body, created_at: created_at, updated_at: updated_at, score: score)
end

# Create comments on answers
CSV.foreach(File.join(__dir__, 'seed_answer_comments.csv'), headers: true) do |comment_row|
  id = comment_row['Id'].to_i
  commenter_id = users.sample.id.to_i
  commentable_type = 'Answer'
  commentable_id = comment_row['PostId'].to_i
  body = comment_row['Text']
  created_at = comment_row['CreationDate']
  updated_at = created_at
  score = comment_row['Score'].to_i
  Comment.create!(id: id, commenter_id: commenter_id, commentable_type: commentable_type, commentable_id: commentable_id, body: body, created_at: created_at, updated_at: updated_at, score: score)
end

# Create tags
CSV.foreach(File.join(__dir__, 'seed_tags.csv'), headers: true) do |tag_row|
  # Id	TagName	Count	ExcerptPostId	WikiPostId
  id = tag_row['Id'];
  name = tag_row['TagName'];
  count = tag_row['Count']
  Tag.create!(id: id, name: name, count: count);
end

CSV.foreach(File.join(__dir__, 'seed_post_tags.csv'), headers: true) do |post_tag_row|
  # PostId	TagId
  question_id = post_tag_row['PostId'];
  tag_id = post_tag_row['TagId'];
  Tagging.create!(question_id: question_id, tag_id: tag_id);
end