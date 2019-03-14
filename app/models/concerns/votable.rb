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
        self.author.improveReputation(10)
      when "down_vote"
        self.update(score: self.score - 1)
        self.author.loseReputation(10)
      else
        return
      end
  end

  def undoVote(vote)
    case vote.vote_type
      when "up_vote"
        self.update(score: self.score - 1)
        self.author.loseReputation(10)
      when "down_vote"
        self.update(score: self.score + 1)
        self.author.improveReputation(10)
      else
        return      
      end
  end

  def award_popular_post_badge
    badge_name = "Popular Post"
    if self.score == 2 && !Badge.find_by(user_id: self.author.id, name: badge_name)
      Badge.create!(user_id: self.author.id, badge_type: 1, name: badge_name);
    end
  end

end