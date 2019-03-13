class ChangeBadgesTypeToBadgeType < ActiveRecord::Migration[5.2]
  def change
    rename_column :badges, :type, :badge_type
  end
end
