class Api::VotesController < ApplicationController

  def vote
    vote_type = params[:vote_type]
    unless Vote.vote_types.include? vote_type
      render json: ["Unknown vote type #{vote_type}"], status: 422
      return
    end

    voter_id = current_user.id
    votable_type = params[:votable_type]
    votable_id = params[:votable_id]

    new_vote = Vote.new(vote_type: vote_type, voter_id: voter_id, votable_type: votable_type, votable_id: votable_id)
    @votable = new_vote.votable
    existing_vote = Vote.find_by(voter_id: voter_id, votable_type: votable_type, votable_id: votable_id)
    if existing_vote.nil?
      new_vote.save!
    else
      new_vote.save! unless new_vote.vote_type == existing_vote.vote_type
      existing_vote.destroy
    end
    render :vote
  end

end