class Api::AnswersController < ApplicationController

  before_action :require_logged_in, only: [
    :create,
    :destroy,
    :downvote,
    :upvote
  ]

  def create
    @answer = Answer.new(answer_params)
    sanitizer = Rails::Html::FullSanitizer.new
    if sanitizer.sanitize(@answer.body).length == 0 
      render json: ['Body cannot be blank'], status: 422
      return
    end
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
    @answer = Answer.find_by(id: params[:id])
    if @answer.nil?
      render json: ["Answer not found."], status: 404
      return
    end

    if current_user.id != @answer.answerer_id
      render json: ["Cannot delete answers of other users."], status: 403
      return
    end

    @answer.destroy
    render :destroy
  end

  def downvote
    vote('down_vote')
  end

  def upvote
    vote('up_vote')
  end

  def vote(vote_type)
    unless Vote.vote_types.include? vote_type
      render json: ["Unknown vote type #{vote_type}"], status: 422
      return
    end    
    @answer = Answer.find_by(id: params[:id])
    if @answer.nil?
      render json: ["Answer not found"], status: 404
      return 
    end
    voter_id = current_user.id
    new_vote = Vote.new(vote_type: vote_type, voter_id: voter_id, votable_type: :Answer, votable_id: @answer.id)
    existing_vote = @answer.votes.find_by(voter_id: voter_id)
    if existing_vote.nil?
      new_vote.save!
    else
      new_vote.save! unless new_vote.vote_type == existing_vote.vote_type
      existing_vote.destroy
    end
    render :vote
  end
  
  private

  def answer_params
    params.require(:answer).permit(:body)
  end

end