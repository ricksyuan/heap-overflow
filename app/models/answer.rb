# == Schema Information
#
# Table name: answers
#
#  id          :bigint(8)        not null, primary key
#  answerer_id :integer          not null
#  editor_id   :integer
#  question_id :integer          not null
#  body        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  accepted    :boolean          default(FALSE), not null
#

class Answer < ApplicationRecord
  belongs_to :question

  belongs_to :answerer,
    class_name: :User

  belongs_to :editor,
    class_name: :User

  has_many :comments, as: :commentable
  
  has_many :votes, as: :votable

end
