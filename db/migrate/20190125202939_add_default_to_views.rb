class AddDefaultToViews < ActiveRecord::Migration[5.2]
  def change
    change_column_default(
      :questions,
      :views,
      from: nil,
      to: 0
    )
  end
end
