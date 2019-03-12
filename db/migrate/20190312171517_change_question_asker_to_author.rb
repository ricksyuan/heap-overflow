class ChangeQuestionAskerToAuthor < ActiveRecord::Migration[5.2]
  def change
    rename_column :questions, :asker_id, :author_id
  end
end
