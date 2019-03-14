# Heap Overflow

## Overview

Q&A community for developers, inspired by Stack Overflow.

#### [Live Site](https://www.heapoverflow.io/)

![Alt text](app/assets/images/readme/top_questions.png?raw=true "Top Questions")

## Features
+ *Ask a question* - Get help on your coding problems from a community of users
+ *Answer a question* - Share your knowledge and solutions with others
+ *Comment* - Discuss posts and help make information relevant and accurate
+ *Vote on posts* - Curate post quality and find concensus
+ *Search* - Filter questions by tags or title
+ Reputation - Earn reputation in the community when someone votes on your post
+ *Badges* - Earn badges for milestones, like asking your first question or having a popular post

## Technologies
+ This project was built using React to allow for a dynamic user experience in the browser, Redux to manage front-end state, and Ruby on Rails on top of a Postgresql database to manage persistance.

## Code highlights
Users can vote on questions, answers, and comments. This feature is implemented using a polymorphic association built off `votable_type` and `votable_id` columns in the `votes` database table. The association is kept DRY using concerns, simplifying the addition of features with complex interactions such as reputation and badges:

```ruby
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
```

## Libraries

This app uses the following open source libraries:

+ [React-Quill](https://github.com/zenoamaro/react-quill) for rich-text question and answer forms
+ [react-markdown](https://github.com/rexxars/react-markdown) for rendering comments as markdown
+ [Moment](https://momentjs.com/) to display elapsed time, e.g. "Asked 47 minutes ago"

## License

MIT

---