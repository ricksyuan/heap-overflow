class RemoveNoNullFromEditor < ActiveRecord::Migration[5.2]
  def change
    change_column_null :questions, :editor_id, true
  end
end