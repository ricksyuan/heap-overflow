class Api::SearchController < ApplicationController

  def search
    @query = params[:query]
    
    # empty search
    if @query == ''
      render json: ["Query cannot be blank"], status: 422
      return
    end

    # tag
    tag_match = /\[(.+)\]/.match(@query)
    if tag_match
      tag_name = tag_match[1]
      @questions = Question.joins(:tags).where(tags: { name: tag_name }).includes(:asker, :answers, :tags, :taggings)
      
      render :tag
      return
    end

    tag = Tag.find_by(name: @query)
    if tag
      @questions = Question.joins(:tags).where(tags: { name: tag.name }).includes(:asker, :answers, :tags, :taggings)
      @query = "[#{@query}]"
      render :tag
      return
    end
    
    # no tag, so search for questions containing query in title
    if tag.nil?
      @questions = Question.where("title ILIKE ?", "%#{@query}%")
      render :search
      return
    end
  end

end