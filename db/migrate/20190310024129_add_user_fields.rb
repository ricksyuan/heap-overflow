class AddUserFields < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :location, :integer, default: 0
    add_column :users, :last_access_date, :datetime
    add_column :users, :website_url, :text
    add_column :users, :profile_image_url, :text
    add_column :users, :about_me, :text
    add_column :users, :views, :integer, default: 0
    add_column :users, :up_votes, :integer, default: 0
    add_column :users, :down_votes, :integer, default: 0
    add_column :users, :email_hash, :string, null: false
  end
end
