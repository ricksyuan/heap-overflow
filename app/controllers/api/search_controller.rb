class Api::SearchController < ApplicationController

  # Search tag(s) first, then title
  def search
    @query_string = params[:query]
    @query_type = ''

    # empty search
    if @query_string == ''
      @query_type = 'BLANK'
      @questions = []
      render :search
      return
    end
    
    # check for quotes
    exact_match = /\"(.+)\"/.match(@query_string)
    if exact_match
      @query_string = exact_match[1]
      searchExact(@query_string)
      return
    end

    # tag
    # Check for tags wrapped in []
    # non-greedy tag matching
    tag_names = @query_string.scan(/\[(.*?)\]/).map {|groups| groups.first }
    if tag_names.length > 0
      searchTags(tag_names)
      return
    end
    
    # Check if words not wrapped in [] are tags
    tags = Tag.where(name: @query_string.split(' '))
    if tags.length > 0
      tag_names = tags.map{|tag| tag.name}
      searchTags(tag_names)
      return
    end
    
    # no tag, so search for questions containing query in title
    if tags.length == 0
      searchExact(@query_string)
      return
    end
  end

  def searchExact(query)
    @query_type = 'EXACT'
    @questions = Question.where('title ILIKE ?', "%#{query}%")
    @query_string = "\"#{@query_string}\""

    render :search
  end

  def searchTags(tag_names)
    @query_type = 'TAGS'
    @questions = Question.joins(:tags)
                         .where('tags.name IN (?)', tag_names)
                         .group('questions.id')
                         .having("COUNT(*) = ?", tag_names.count)
    @query_string = tag_names.map{|tag_name| "[#{tag_name}]"}.join(' ')
    render :search
  end

end