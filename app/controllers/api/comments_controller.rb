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
    @comment = Comment.find(params[:id])
    if @comment
      @comment.destroy
      render :destroy
    else
      render json: ["Comment not found"], status: 404
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:commentable_type, :commentable_id, :body)
  end

end