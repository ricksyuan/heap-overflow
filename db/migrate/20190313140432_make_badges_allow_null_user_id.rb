class MakeBadgesAllowNullUserId < ActiveRecord::Migration[5.2]
  def change
    change_column_null :badges, :user_id, true
  end
end
