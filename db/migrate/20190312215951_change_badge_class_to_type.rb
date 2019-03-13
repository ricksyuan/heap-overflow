class ChangeBadgeClassToType < ActiveRecord::Migration[5.2]
  def change
    rename_column :badges, :class, :type
  end
end
