# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

# Clear existing data
User.delete_all
Question.delete_all
Tag.delete_all
Answer.delete_all
Tagging.delete_all
Vote.delete_all
Comment.delete_all
Badge.delete_all

def mapSeedFiletoUsers(seed_file)
  CSV.foreach(File.join(__dir__, seed_file), headers: true) do |user_row|
    # Id	Reputation	CreationDate	DisplayName	LastAccessDate	WebsiteUrl	Location	AboutMe	Views	UpVotes	DownVotes	ProfileImageUrl	EmailHash	AccountId
    id = user_row['Id'].to_i
    reputation = user_row['Reputation'].to_i
    display_name = user_row['DisplayName']
    last_access_date = user_row['LastAccessDate']
    website_url = user_row['WebsiteUrl']
    location = user_row['Location']
    about_me = user_row['AboutMe']
    views = user_row['Views'].to_i
    up_votes = user_row['UpVotes'].to_i
    down_votes = user_row['DownVotes'].to_i
    profile_image_url = user_row['ProfileImageUrl']
    email_hash = user_row['EmailHash']
    email = "#{display_name.delete(' ')}#{id}@example.com"
    account_id = user_row['AccountId'].to_i
    User.create(
      id: id,
      password: 'password',
      email: email,
      reputation: reputation,
      display_name: display_name,
      last_access_date: last_access_date,
      website_url: website_url,
      location: location,
      about_me: about_me,
      views: views,
      up_votes: up_votes,
      down_votes: down_votes,
      profile_image_url: profile_image_url
    )
  end
end

mapSeedFiletoUsers('seed_users_for_questions.csv')
mapSeedFiletoUsers('seed_users_for_question_comments.csv')
mapSeedFiletoUsers('seed_users_for_answers.csv')
mapSeedFiletoUsers('seed_users_for_answer_comments.csv')

# Create demo user
demo_user = User.create!(
  display_name: 'demouser',
  email: 'demouser@example.com',
  password: "password"
)

# Create default user
default_user = User.create!(
  display_name: 'Default User',
  email: 'defaultuser@example.com',
  password: "password"
)

# Create badges
CSV.foreach(File.join(__dir__, 'seed_badges_4000.csv'), headers: true) do |badge_row|
  id = badge_row['Id'].to_i
  name = badge_row['Name']
  # class and type are reserved words in Rails
  badge_type = badge_row['Class'].to_i
  user_id = badge_row['UserId'].to_i
  if user_id == 0
    user_id = default_user.id
  end
  Badge.create!(id: id, user_id: user_id, name: name, badge_type: badge_type);
end

# # Create questions

CSV.foreach(File.join(__dir__, 'seed_questions.csv'), headers: true) do |question_row|
  # Id	PostTypeId	AcceptedAnswerId	ParentId	CreationDate	DeletionDate	Score	ViewCount	Body	OwnerUserId	OwnerDisplayName	LastEditorUserId	LastEditorDisplayName	LastEditDate	LastActivityDate	Title	Tags	AnswerCount	CommentCount	FavoriteCount	ClosedDate	CommunityOwnedDate
  id = question_row['Id'].to_i
  title = question_row['Title']
  author_id = question_row['OwnerUserId'].to_i
  editor_id = author_id
  views = question_row['ViewCount'].to_i
  body = question_row['Body']
  created_at = question_row['CreationDate']
  updated_at = question_row['LastEditDate']
  answers_count = question_row['AnswerCount'].to_i
  score = question_row['Score'].to_i
  Question.create!(id: id, title: title, author_id: author_id, editor_id: editor_id, views: views, body: body, created_at: created_at, updated_at: updated_at, answers_count: answers_count, score: score)
end

# Create answers
CSV.foreach(File.join(__dir__, 'seed_answers.csv'), headers: true) do |answer_row|
  id = answer_row['Id'].to_i
  question_id = answer_row['ParentId'].to_i
  author_id = answer_row['OwnerUserId'].to_i
  author_id = default_user.id if author_id == 0
  editor_id = author_id
  body = answer_row['Body']
  created_at = answer_row['CreationDate']
  updated_at = answer_row['LastEditDate']
  score = answer_row['Score'].to_i
  Answer.create!(id: id, question_id: question_id, author_id: author_id, editor_id: editor_id, body: body, created_at: created_at, updated_at: updated_at, score: score)
end

def mapSeedFileToComments(seed_file, commentable_type, default_user)
  CSV.foreach(File.join(__dir__, seed_file), headers: true) do |comment_row|
    # Id	PostId	Score	Text	CreationDate	UserDisplayName	UserId
    id = comment_row['Id'].to_i
    author_id = comment_row['UserId'].to_i
    author = User.find_by(id: author_id)
    author_id = default_user.id unless author
    commentable_type = commentable_type
    commentable_id = comment_row['PostId'].to_i
    body = comment_row['Text']
    created_at = comment_row['CreationDate']
    updated_at = created_at
    score = comment_row['Score'].to_i
    Comment.create!(id: id, author_id: author_id, commentable_type: commentable_type, commentable_id: commentable_id, body: body, created_at: created_at, updated_at: updated_at, score: score)    
  end
end

# Create comments on questions
mapSeedFileToComments('seed_question_comments.csv', 'Question', default_user)
# Create comments on answers
mapSeedFileToComments('seed_answer_comments.csv', 'Answer', default_user)

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

ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end