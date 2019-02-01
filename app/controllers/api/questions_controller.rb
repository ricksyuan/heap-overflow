class Api::QuestionsController < ApplicationController
  
  # before_action :require_logged_in, only: [:create]

  def index
    @questions = Question.all.includes(:asker, :answers, :tags)
  end


  # def search

  # end

  def show
    @question = Question.includes(:asker, :answerers, :votes, { answers: [:votes] }).find(params[:id])
    if @question      
      render :show
    else
      render json: ["Question not found"], status: 404
    end
  end

  def create
    @question = Question.new(question_params)
    @question.asker_id = current_user.id
    @question.editor_id = current_user.id
    if @question.save
      render :show
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  def destroy
    question = Question.find(params[:id])    
    if question      
      if question.asker_id == current_user.id
        question.destroy
        render json: question.id
      else
        render json: ["Cannot delete another user's question."], status: 403
      end
    else
      render json: ["Question #{params[:id]} not found."], status: 404
    end    
  end

  private

  def question_params
    params.require(:question).permit(:title, :body)
  end

end