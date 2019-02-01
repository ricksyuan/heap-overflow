class Api::QuestionsController < ApplicationController
  
  # before_action :require_logged_in, only: [:create]

  def index
    @questions = Question.all.includes(:asker, :answers, :tags)
  end


  def search
    # @questions = Question.all.includes(:asker, :answers, :tags)
    query = params[:query]
    if query == ''
      @questions = Question.all.includes(:asker, :answers, :tags)
      render :index
      return
    end

    query_terms = query.split
    if query_terms.length == 1 
      # search as a tag
      @questions = Question.joins(:tags).where(tags: { name: query }).includes(:asker, :answers, :tags)
      if @questions.empty?
        @questions = Question.where("title ILIKE ?", "%#{query}%")   
      end
    else
      @questions = Question.where("title ILIKE ?", "%#{query}%")
    end
    render :index
  end

  def show
    @question = Question.includes(:asker, :answerers, :votes, { answers: [:votes] }).find(params[:id])
    if @question
      render :show
    else
      render json: ["Question not found"], status: 404
    end
  end

  def create
    @question = Question.new(question_params)
    @question.asker_id = current_user.id
    @question.editor_id = current_user.id
    
    if @question.save
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
      if question.asker_id == current_user.id
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