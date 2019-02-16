class Api::SearchController < ApplicationController

  # Search tag(s) first, then title
  def search

    @query_string = params[:query]
    @query_type = ''

    # empty search
    if @query_string == ''
      @query_type = 'BLANK'
      render json: ["Query cannot be blank"], status: 422
      return
    end

    # tag
    tag_match = /\[(.+)\]/.match(@query_string)
    if tag_match
      @query_type = 'TAG'
      tag_name = tag_match[1]
      @questions = Question.joins(:tags).where(tags: { name: tag_name })
      render :tag
      return
    end

    tag = Tag.find_by(name: @query_string)
    if tag
      @questions = Question.joins(:tags).where(tags: { name: tag.name })
      # Update query string to indicate was treated as tag
      @query_string = "[#{@query_string}]"
      render :tag
      return
    end
    
    # no tag, so search for questions containing query in title
    if tag.nil?
      @query_type = 'QUESTION_TITLE'
      @questions = Question.where('title ILIKE ?', "%#{@query_string}%")
      render :search
      return
    end
  end

end