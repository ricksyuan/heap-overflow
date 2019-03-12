# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_12_173831) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer "author_id", null: false
    t.integer "editor_id"
    t.integer "question_id", null: false
    t.string "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "accepted", default: false, null: false
    t.integer "score", default: 0
    t.index ["author_id"], name: "index_answers_on_author_id"
    t.index ["editor_id"], name: "index_answers_on_editor_id"
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "author_id", null: false
    t.string "commentable_type"
    t.bigint "commentable_id"
    t.string "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "score", default: 0
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["body"], name: "index_comments_on_body"
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
  end

  create_table "questions", force: :cascade do |t|
    t.integer "author_id", null: false
    t.integer "editor_id"
    t.integer "views", default: 0, null: false
    t.string "title", null: false
    t.string "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "answers_count", default: 0
    t.integer "score", default: 0
    t.index ["author_id"], name: "index_questions_on_author_id"
    t.index ["body"], name: "index_questions_on_body"
    t.index ["editor_id"], name: "index_questions_on_editor_id"
    t.index ["title"], name: "index_questions_on_title"
  end

  create_table "taggings", force: :cascade do |t|
    t.integer "tag_id", null: false
    t.integer "question_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_taggings_on_question_id"
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "count", default: 0
    t.index ["name"], name: "index_tags_on_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "display_name", null: false
    t.integer "reputation", default: 0, null: false
    t.integer "photo_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "last_access_date"
    t.text "website_url"
    t.text "profile_image_url"
    t.text "about_me"
    t.integer "views", default: 0
    t.integer "up_votes", default: 0
    t.integer "down_votes", default: 0
    t.string "email_hash", null: false
    t.string "location"
    t.index ["display_name"], name: "index_users_on_display_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["photo_id"], name: "index_users_on_photo_id"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.integer "voter_id", null: false
    t.string "votable_type"
    t.bigint "votable_id"
    t.string "vote_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["votable_type", "votable_id"], name: "index_votes_on_votable_type_and_votable_id"
  end

end
