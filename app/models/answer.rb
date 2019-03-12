# == Schema Information
#
# Table name: answers
#
#  id          :bigint(8)        not null, primary key
#  author_id   :integer          not null
#  editor_id   :integer
#  question_id :integer          not null
#  body        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  accepted    :boolean          default(FALSE), not null
#  score       :integer          default(0)
#

class Answer < ApplicationRecord

  validates :body, presence: true, allow_blank: false

  include Commentable
  include Votable
  
  belongs_to :question, counter_cache: true

  belongs_to :author,
    class_name: :User

  belongs_to :editor,
    class_name: :User

end
