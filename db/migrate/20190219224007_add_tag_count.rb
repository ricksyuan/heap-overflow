class AddTagCount < ActiveRecord::Migration[5.2]
  def change
    add_column :tags, :count, :integer, default: 0
  end
end
