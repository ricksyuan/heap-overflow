class GenerateCounters < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :answers_count, :integer, default: 0    
  end
end
