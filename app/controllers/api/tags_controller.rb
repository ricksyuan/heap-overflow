class Api::TagsController < ApplicationController
  def index
    @tags = Tag.all
    render :tags
  end
end