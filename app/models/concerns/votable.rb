module Votable
  extend ActiveSupport::Concern

  included do
    has_many :votes, as: :votable, dependent: :destroy
    has_many :voters, through: :votes
  end

def addVote(vote)
  case vote.vote_type
    when "up_vote"
      self.update(score: self.score + 1)
      if self.class == Question
        self.asker.improveReputation(10)
      end
    when "down_vote"
      self.update(score: self.score - 1)
      if self.class == Question
        self.asker.loseReputation(10)
      end
    else
      return
    end
end

def undoVote(vote)
  case vote.vote_type
    when "up_vote"
      self.update(score: self.score - 1)
    when "down_vote"
      self.update(score: self.score + 1)
    else
      return      
    end
end


  # def recalcScore
  #   votes.reduce(0) do |acc, vote|   
  #     case vote.vote_type
  #     when "up_vote"
  #       acc += 1
  #     when "down_vote"
  #       acc -= 1
  #     else
  #       acc
  #     end
  #   end
  # end

end