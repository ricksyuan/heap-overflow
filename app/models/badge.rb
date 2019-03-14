class Badge < ApplicationRecord
  belongs_to :user

  # Bronze
  FIRST_QUESTION_BADGE_NAME = 'First Question'
  FIRST_ANSWER_BADGE_NAME = 'First Answer'
  FIRST_COMMENT_BADGE_NAME = 'First Comment'
  FIRST_VOTE_BADGE_NAME = 'First Vote'
  # Silver
  FEATURE_PRO_BADGE_NAME = 'Feature Pro'
  # Gold
  POPULAR_POST_BADGE_NAME = 'Popular Post'
  
end