# Heap Overflow

## Overview

Q&A community for developers, inspired by Stack Overflow.

#### [Live Site](https://www.heapoverflow.io/)

![Alt text](app/assets/images/readme/top_questions.png?raw=true "Top Questions")

## Features
+ *Q&A* - Use rich text editing to ask or answer coding questions in a community of users
+ *Comments* - Use markdown to discuss existing questions or answers and keep posts relevant and accurate 
+ *Vote* - Up vote helpful questions, answers, and comments written by other users. Downvote questions and answers that need improvement
+ *Search* - Filter questions by tags or title
+ *Reputation* - Receive/lose reputation in the community when other users upvote/downvote your post
+ *Badges* - Receive badges for milestones, such as asking your first question or having a popular post

## Technologies
+ This project was built using React, Redux, and Ruby on Rails on top of a Postgresql database.

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