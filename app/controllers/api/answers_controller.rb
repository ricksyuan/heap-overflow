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

def downvote
    vote('down_vote')
  end

  def upvote
    vote('up_vote')
  end

  def vote(vote_type)
    unless Vote.vote_types.include? vote_type
      render json: ["Unknown vote type #{vote_type}"]
      return
    end
    @answer = Answer.find(params[:id])
    voter_id = current_user.id
    @vote = @answer.votes.find_by(voter_id: voter_id)
    if @vote.nil?
      @vote = Vote.create(voter_id: voter_id, votable_type: :Answer, votable_id: @answer.id, vote_type: vote_type)
    else
      @vote.destroy      
    end
    render :vote
  end
  
  private

  def answer_params
    params.require(:answer).permit(:body)
  end

end