class CreateAnswersTable < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.integer :author_id, null: false
      t.integer :editor_id
      t.integer :question_id, null: false
      t.boolean :accepted, null: false, default: false
      t.string :body, null: false

      t.timestamps
    end
    add_index :answers, :answerer_id
    add_index :answers, :editor_id
    add_index :answers, :question_id
    add_index :answers, :body
  end
end
