class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.integer :asker_id, null: false
      t.integer :editor_id, null: false
      t.integer :views, null: false
      t.string :title, null: false
      t.string :body, null: false
      
      t.timestamps
    end
    add_index :questions, :asker_id
    add_index :questions, :editor_id
    add_index :questions, :title
    add_index :questions, :body
  end
end
