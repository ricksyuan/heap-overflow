class FixUserLocationColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :location, :integer, default: 0
    add_column :users, :location, :string
  end
end
