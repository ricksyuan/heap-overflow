class Api::QuestionsController < ApplicationController
  
  def index
    @questions = Question.all
  end  


end