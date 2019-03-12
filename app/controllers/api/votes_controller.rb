class Api::VotesController < ApplicationController

  before_action :require_logged_in, only: [
    :vote,
  ]

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

    # Prevent author from voting on own posts
    if voter_id == @votable.author.id
      render json: ["Cannot vote on own post"], status: 403;
      return
    end

    existing_vote = Vote.find_by(voter_id: voter_id, votable_type: votable_type, votable_id: votable_id)
    if existing_vote.nil?
      new_vote.save!
      @votable.addVote(new_vote);
    else
      unless new_vote.vote_type == existing_vote.vote_type
        new_vote.save!
        @votable.addVote(new_vote);
      end
      existing_vote.destroy
      @votable.undoVote(existing_vote)
    end
    render :vote
  end

end