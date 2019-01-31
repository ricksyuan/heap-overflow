class Api::VotesController < ApplicationController

  def create
    vote_type = params[:vote_type]
    unless Vote.vote_types.include? vote_type
      render json: ["Unknown vote type #{vote_type}"], status: 422
      return
    end
    votable_type = params[:votable_type]    
    votable_id = params[:votable_id]
    votable = nil

    case votable_type
    when "Question"
      votable = Question.find(votable_id)
    when "Answer"
      votable = Answer.find(votable_id)
    else
      render json: ["Unknown votable type #{votable_type}"], status: 422
    end
    
    voter_id = current_user.id
    @vote = Vote.find_by(voter_id: voter_id, votable_type: votable_type, votable_id: votable_id)
    if @vote.nil?
      @vote = Vote.create(voter_id: voter_id, votable_type: votable_type, votable_id: votable_id, vote_type: vote_type)
    else
      @vote.destroy
    end
    @field = votable_type.downcase # lowercase name for JSON
    @score = votable.score
    render :vote
  end

end