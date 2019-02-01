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

  UPVOTE = 'up_vote'
  DOWNVOTE = 'down_vote'
  VOTE_TYPES = [UPVOTE, DOWNVOTE]
  
  def self.vote_types
    VOTE_TYPES
  end

  def opposite_vote_type
    if self.vote_type == UPVOTE
      "down_vote"
    elsif self.vote_type == DOWNVOTE
      "up_vote"
    else
      nil
    end
  end

  def json_name
    self.votable_type.downcase
  end
end