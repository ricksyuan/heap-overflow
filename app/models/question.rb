# == Schema Information
#
# Table name: questions
#
#  id         :bigint(8)        not null, primary key
#  asker_id   :integer          not null
#  editor_id  :integer
#  views      :integer          default(0), not null
#  title      :string           not null
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ApplicationRecord

  include Commentable
  include Votable

  validates :views, :title, :body, :body, presence: true
  
  belongs_to :asker,
    class_name: :User

  belongs_to :editor,
    class_name: :User
  
  has_many :answers
    
  has_many :taggings
  has_many :tags, through: :taggings


end
