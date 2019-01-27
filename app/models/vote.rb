# == Schema Information
#
# Table name: votes
#
#  id           :bigint(8)        not null, primary key
#  voter_id     :integer          not null
#  votable_type :string
#  votable_id   :bigint(8)
#  vote_type    :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Vote < ApplicationRecord

  belongs_to :votable, polymorphic: true

  belongs_to :voter,
    class_name: :User
end
