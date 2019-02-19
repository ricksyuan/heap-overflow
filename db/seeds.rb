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


demo_user = User.create!(
  display_name: 'demouser',
  email: 'demo@example.com',
  password: "password"
)
# Create users from Silicon Valley
users = []
8.times do |i|
  display_name = Faker::TvShows::SiliconValley.unique.character
  email = "#{display_name.split(' ').join('.')}@example.com"
  users.push(User.create!(display_name: display_name, email: email, password: 'password'));
end

questions_table = CSV.read(File.join(__dir__, 'seed_questions.csv'), headers: true)
questions_table.each do |question_row|
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