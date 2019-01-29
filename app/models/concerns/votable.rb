module Votable
  extend ActiveSupport::Concern

  included do
    has_many :votes, as: :votable
  end

  def score
    votes.reduce(0) do |acc, vote|   
      case vote.vote_type
      when "up_vote"
        acc += 1
      when "down_vote"
        acc -= 1
      else
        acc
      end
    end
  end

end