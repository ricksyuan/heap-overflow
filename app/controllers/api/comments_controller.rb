class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    @comment.commenter_id = current_user.id
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    if @comment.nil?
      render json: ['Comment does not exist'], status: 404
      return
    end

    if current_user.id != @comment.commenter_id
      render json: ["Not authorized to delete other users' comments"], status: 403
      return
    end

    @comment.destroy
    render :destroy
    
  end

  private

  def comment_params
    params.require(:comment).permit(:commentable_type, :commentable_id, :body)
  end

end