class Api::AnswersController < ApplicationController

  before_action :require_logged_in, only: [
    :create,
    :destroy,
    :downvote,
    :upvote
  ]

  def create
    @answer = Answer.new(answer_params)
    # Check answer body using sanitizer since answer body may appear
    # blank while containing html tags that bypass validations
    sanitizer = Rails::Html::FullSanitizer.new
    if sanitizer.sanitize(@answer.body).length == 0 
      render json: ['Body cannot be blank'], status: 422
      return
    end
    @answer.author_id = current_user.id
    @answer.editor_id = current_user.id
    @answer.question_id = params[:question_id]
    if @answer.save
      render :show
    else
      render json: @answer.errors.full_messages, status: 422
    end
  end

  def destroy
    @answer = Answer.find_by(id: params[:id])
    if @answer.nil?
      render json: ["Answer not found."], status: 404
      return
    end

    if current_user.id != @answer.author_id
      render json: ["Cannot delete answers of other users."], status: 403
      return
    end

    @answer.destroy
    render :destroy
  end
  
  private

  def answer_params
    params.require(:answer).permit(:body)
  end

end