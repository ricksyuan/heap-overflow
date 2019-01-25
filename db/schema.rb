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

ActiveRecord::Schema.define(version: 2019_01_25_201447) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "questions", force: :cascade do |t|
    t.integer "asker_id", null: false
    t.integer "editor_id", null: false
    t.integer "views", null: false
    t.string "title", null: false
    t.string "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asker_id"], name: "index_questions_on_asker_id"
    t.index ["body"], name: "index_questions_on_body"
    t.index ["editor_id"], name: "index_questions_on_editor_id"
    t.index ["title"], name: "index_questions_on_title"
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
    t.index ["display_name"], name: "index_users_on_display_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["photo_id"], name: "index_users_on_photo_id"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
