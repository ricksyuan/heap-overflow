# == Schema Information
#
# Table name: taggings
#
#  id          :bigint(8)        not null, primary key
#  tag_id      :integer          not null
#  question_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Tagging < ApplicationRecord
  
  belongs_to :tag
  
  belongs_to :question

end
