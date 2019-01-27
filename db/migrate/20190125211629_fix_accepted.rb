class FixAccepted < ActiveRecord::Migration[5.2]
  def change
    remove_column :answers, :accepted
    remove_column :answers, :boolean
    add_column :answers, :accepted, :boolean, null: false, default: false
  end
end
