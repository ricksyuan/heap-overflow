# == Schema Information
#
# Table name: comments
#
#  id               :bigint(8)        not null, primary key
#  author_id        :integer          not null
#  commentable_type :string
#  commentable_id   :bigint(8)
#  body             :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  score            :integer          default(0)
#

class Comment < ApplicationRecord
  # include Commentable
  include Votable
  
  belongs_to :commentable, polymorphic: true
  belongs_to :author,
    class_name: :User

  has_many :votes, as: :votable

  

end
