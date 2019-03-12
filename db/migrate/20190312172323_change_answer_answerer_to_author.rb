class ChangeAnswerAnswererToAuthor < ActiveRecord::Migration[5.2]
  def change
    rename_column :answers, :answerer_id, :author_id
  end
end
