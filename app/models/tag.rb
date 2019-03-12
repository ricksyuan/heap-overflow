# == Schema Information
#
# Table name: tags
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  count      :integer          default(0)
#

class Tag < ApplicationRecord  
  
  has_many :taggings

  has_many :questions, through: :taggings

end
