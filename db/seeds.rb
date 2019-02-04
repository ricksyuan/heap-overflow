# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Question.delete_all
Tag.delete_all
Answer.delete_all
Tagging.delete_all
Vote.delete_all
Comment.delete_all

demo_user = User.create!(display_name: "demouser", email: "demo@example.com", password: "password")
test_user = User.create!(display_name: "testuser", email: "test@example.com", password: "password")
curious_george = User.create!(display_name: "Curious George", email: "curious.george@example.com", password: "password", reputation: 10)
gandalf = User.create!(display_name: "Gandalf", email: "foolishwizard@example.com", password: "password", reputation: 3000)
hal = User.create!(display_name: "HAL 9000", email: "justcallmehal@example.com", password: "password", reputation: 1850)
code_cranker = User.create!(display_name: "Code Cranker", email: "code.cranker@example.com", password: "password", reputation: 500)
cranky_coder = User.create!(display_name: "Cranky Coder", email: "cranky.coder@example.com", password: "password", reputation: 100)
mr_t = User.create!(display_name: "Mr. T", email: "ipitythefool@example.com", password: "password", reputation: 1000)

q1 = Question.create!(
  views: 994558,
  asker_id: curious_george.id,
  editor_id: curious_george.id,
  title: "What does \"use strict\" do in JavaScript, and what is the reasoning behind it?",
  body: "Recently, I ran some of my JavaScript code through Crockford's JSLint, and it gave the following error: Problem at line 1 character 1: Missing \"use strict\" statement. Doing some searching, I realized that some people add \"use strict\"; into their JavaScript code. Once I added the statement, the error stopped appearing. Unfortunately, Google did not reveal much of the history behind this string statement. Certainly it must have something to do with how the JavaScript is interpreted by the browser, but I have no idea what the effect would be. So what is \"use strict\"; all about, what does it imply, and is it still relevant? Do any of the current browsers respond to the \"use strict\"; string or is it for future use?"
  )

q1_answer = Answer.create!(
  answerer_id: gandalf.id,
  editor_id: gandalf.id,
  question_id: q1.id,
  body: "Strict Mode is a new feature in ECMAScript 5 that allows you to place a program, or a function, in a \"strict\" operating context. This strict context prevents certain actions from being taken and throws more exceptions."
)

q1_comment = Comment.create!(
  commenter_id: gandalf.id,
  commentable_type: :Question,
  commentable_id: q1.id,
  body: "I have this question, too!"
)

q1_answer_comment = Comment.create!(
  commenter_id: hal.id,
  commentable_type: :Answer,
  commentable_id: q1_answer.id,
  body: "Changing the default after so many years ? Too late for that : it would break so many existing sites/scripts/applications... The only possible thing is to help make things better, for the future."
)

javascript_tag = Tag.create!(name: "javascript")
syntax_tag = Tag.create!(name: "syntax")
jslint_tag = Tag.create!(name: "jslint")
use_strict_tag = Tag.create!(name: "use-strict")

Tagging.create!(tag_id: javascript_tag.id, question_id: q1.id)
Tagging.create!(tag_id: syntax_tag.id, question_id: q1.id)
Tagging.create!(tag_id: jslint_tag.id, question_id: q1.id)
Tagging.create!(tag_id: use_strict_tag.id, question_id: q1.id)

Vote.create!(voter_id: code_cranker.id, votable_type: :Question, votable_id: q1.id, vote_type: "up_vote")
Vote.create!(voter_id: cranky_coder.id, votable_type: :Question, votable_id: q1.id, vote_type: "down_vote")
Vote.create!(voter_id: mr_t.id, votable_type: :Question, votable_id: q1.id, vote_type: "up_vote")

q2 = Question.create!(
  views: 302919,
  asker_id: hal.id,
  editor_id: hal.id,
  title: "How to drop columns using Rails migration",
  body: "What's the syntax for dropping a database table column through a Rails migration?"
  )

q2_answer = Answer.create!(
  answerer_id: gandalf.id,
  editor_id: gandalf.id,
  question_id: q2.id,
  body: "remove_column :table_name, :column_name"
)

q2_answer_comment = Comment.create!(
  commenter_id: code_cranker.id,
  commentable_type: :Answer,
  commentable_id: q2_answer.id,
  body: "And make sure to do this inside up and down methods, not change."
)

ruby_on_rails_tag = Tag.create!(name: "ruby-on-rails")
ruby_tag = Tag.create!(name: "ruby")
database_tag = Tag.create!(name: "database")
rails_migrations_tag = Tag.create!(name: "rails-migrations")

Tagging.create!(tag_id: ruby_on_rails_tag.id, question_id: q2.id)
Tagging.create!(tag_id: ruby_tag.id, question_id: q2.id)
Tagging.create!(tag_id: database_tag.id, question_id: q2.id)
Tagging.create!(tag_id: rails_migrations_tag.id, question_id: q2.id)
