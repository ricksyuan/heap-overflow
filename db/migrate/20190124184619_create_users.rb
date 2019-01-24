class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :display_name, null: false
      t.integer :reputation, default: 0, null: false
      t.integer :photo_id
      
      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :display_name
    add_index :users, :session_token, unique: true
    add_index :users, :photo_id
  end
end
