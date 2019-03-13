class CreateBadges < ActiveRecord::Migration[5.2]
  def change
    create_table :badges do |t|
      t.integer :user_id, null: false
      t.string :name, null: false
      t.integer :class, null: false

      t.timestamps
    end
    add_index :badges, :user_id
    add_index :badges, :name
  end
end
