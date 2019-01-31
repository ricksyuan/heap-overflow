class Api::AnswersController < ApplicationController
  
  def create
    @answer = Answer.new(answer_params)
    @answer.answerer_id = current_user.id
    @answer.editor_id = current_user.id
    @answer.question_id = params[:question_id]
    if @answer.save
      render :show
    else
      render json: @answer.errors.full_messages, status: 422
    end
  end

  def destroy
    @answer = Answer.find(params[:id])
    if @answer
      @answer.destroy
      render json: @answer.id
    else
      render json: ["Answer not found"], status: 404
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:body)
  end

end