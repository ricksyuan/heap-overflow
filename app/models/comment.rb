# == Schema Information
#
# Table name: comments
#
#  id               :bigint(8)        not null, primary key
#  commenter_id     :integer          not null
#  commentable_type :string
#  commentable_id   :bigint(8)
#  body             :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Comment < ApplicationRecord
  include Commentable
  
  belongs_to :commentable, polymorphic: true

  has_many :votes, as: :votable

end
