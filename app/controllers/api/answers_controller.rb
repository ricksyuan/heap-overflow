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

  def upvote
    @answer = Answer.find(params[:id])
    voter_id = current_user.id
    @vote = @answer.votes.find_by(voter_id: voter_id)
    if @vote.nil?
      @vote = Vote.create(voter_id: voter_id, votable_type: :Answer, votable_id: @answer.id, vote_type: "up_vote")
      render :vote
    elsif @vote.vote_type = "down_vote"
      @vote.destroy      
      render :vote
    elsif @vote.vote_type = "up_vote"
      render json: ["Cannot upvote again"], status: 403
    else
      render json: ["Unknown vote type"], status: 422
    end
  end

  def downvote
    @answer = Answer.find(params[:id])
    voter_id = current_user.id
    @vote = @answer.votes.find_by(voter_id: voter_id)
    if @vote.nil?
      @vote = Vote.create(voter_id: voter_id, votable_type: :Answer, votable_id: @answer.id, vote_type: "down_vote")
      render :vote
    elsif @vote.vote_type = "up_vote"
      @vote.destroy      
      render :vote
    elsif @vote.vote_type = "down_vote"
      render json: ["Cannot downvote again"], status: 403
    else
      render json: ["Unknown vote type"], status: 422
    end
  end
  
  private

  def answer_params
    params.require(:answer).permit(:body)
  end

end