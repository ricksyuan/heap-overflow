class Api::QuestionsController < ApplicationController
  
  def index
    @questions = Question.all.includes(:asker, :answers, :tags)
  end

end