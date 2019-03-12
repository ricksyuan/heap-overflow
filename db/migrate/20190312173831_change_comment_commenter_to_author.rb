class ChangeCommentCommenterToAuthor < ActiveRecord::Migration[5.2]
  def change
    rename_column :comments, :commenter_id, :author_id
  end
end
