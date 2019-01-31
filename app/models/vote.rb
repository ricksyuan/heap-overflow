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

  VOTE_TYPES = ['up_vote', 'down_vote']

  def self.vote_types
    VOTE_TYPES
  end

  def opposite_vote_type
    if self.vote_type == "up_vote"
      "down_vote"
    elsif self.vote_type == "down_vote"
      "up_vote"
    else
      nil
    end
  end

  def json_name
    self.votable_type.downcase
  end
end