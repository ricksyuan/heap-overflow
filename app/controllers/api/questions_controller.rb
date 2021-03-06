class Api::QuestionsController < ApplicationController
  
  before_action :require_logged_in, only: [
    :create,
    :destroy
  ]

  def index
    @limit = params[:limit].to_i || 10
    sort_order = params[:sort] || 'NEWEST'
    case sort_order
    when 'NEWEST'
      sort_criteria = 'created_at DESC'
    when 'VOTES'
      sort_criteria = 'score DESC'
    else
      sort_criteria = 'UNKNOWN'
    end
    @page = params[:page]
    @questions = Question.order(sort_criteria).paginate(page: @page, per_page: @limit)
    @total_pages = @questions.total_pages
  end

  def show
    @question = Question.includes(
      :votes,
      {author: [:badges]},
      {answers: [:votes, {author: [:badges]}]},
      {comments: [:votes, {author: [:badges]}]},
    ).find(params[:id])
    if @question
      @question.update(views: @question.views + 1)
      render :show
    else
      render json: ["Question not found"], status: 404
    end
  end

  def create
    @question = Question.new(question_params)
    @question.author_id = current_user.id
    @question.editor_id = current_user.id
    
    if @question.save
      # Create tags if necessary
      tag_string = params[:question][:tags]
      tags_array = tag_string.split
      tags_array.each do |tag_name|
        tag = Tag.find_or_create_by(name:tag_name)
        Tagging.find_or_create_by(question_id: @question.id, tag_id: tag.id)
      end
      award_feature_badges
      render :show
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  def update
    @question = Question.find_by(id: params[:id])
    @question.editor_id = current_user.id
    
    if @question.update_attributes(question_params)
      old_tags = @question.taggings
      old_tags.each do |tag|
        tag.destroy
      end
      tag_string = params[:question][:tags]
      tags_array = tag_string.split
      tags_array.each do |tag_name|
        tag = Tag.find_or_create_by(name:tag_name)
        Tagging.find_or_create_by(question_id: @question.id, tag_id: tag.id)
      end
      render :show
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  def destroy
    question = Question.find(params[:id])    
    if question      
      if question.author_id == current_user.id
        question.destroy
        render json: question.id
      else
        render json: ["Cannot delete another user's question."], status: 403
      end
    else
      render json: ["Question #{params[:id]} not found."], status: 404
    end    
  end

  private

  def question_params
    params.require(:question).permit(:title, :body)
  end

end