class CreateTables < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :commenter_id, null: false, index: true
      t.references :commentable, polymorphic: true, index: true
      t.string :body, null: false, index: true

      t.timestamps
    end

    create_table :tags do |t|
      t.string :name, null: false, index: true
      
      t.timestamps
    end

    create_table :taggings do |t|
      t.integer :tag_id, null: false, index: true
      t.integer :question_id, null: false, index: true

      t.timestamps
    end

    create_table :votes do |t|
      t.integer :voter_id, null: false
      t.references :votable, polymorphic: true, index: true
      t.string :vote_type, null: false
      
      t.timestamps
    end

  end
end
