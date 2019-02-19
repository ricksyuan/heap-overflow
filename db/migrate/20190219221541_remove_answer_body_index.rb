class RemoveAnswerBodyIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :answers, column: :body
  end
end
