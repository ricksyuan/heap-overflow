class AddScore < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :score, :integer, default: 0
    add_column :answers, :score, :integer, default: 0
    add_column :comments, :score, :integer, default: 0
  end
end
