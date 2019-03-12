module Commentable
  extend ActiveSupport::Concern
  
  included do
    has_many :comments, as: :commentable, dependent: :destroy
    has_many :comment_authors, through: :comments, source: :author

  end
  

end