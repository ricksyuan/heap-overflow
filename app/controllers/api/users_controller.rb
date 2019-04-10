class Api::UsersController < ApplicationController

  # Sign up user
  def create
    # demo
    if params[:user] == 'demo'
      last_id = User.last.id
      display_name = "demouser#{last_id + 1}"
      email = "#{display_name}@example.com"
      @user = User.new(
        display_name: display_name,
        email: email,
        password: 'password'
      )
      @user.save!
      login!(@user)
      render :user
      return
    end
    # normal sign in
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # Modify user info
  def update        
    @user = selected_user
    if @user && user.update_atributes(user_params)
      render :user
    elsif !@user
      render json: ['Could not locate user'], status: 400 # Bad request
    else
      render json: @user.errors.full_messages, status: 401 # Unauthorized
    end
  end

  # Get all relevent info for user profile
  def show
    @user = User.find(params[:id]);
    # TODO: Eliminate n+1 queries
    if @user
      @questions = @user.questions
      @answers = @user.answers
      @answers.each do |answer|
        @questions.push(answer.question)
      end
      render :profile
    else
      render :json ["User not found"], status: 404
    end
    
  end

  def index
    @page = params[:page]
    @users = User.paginate(page: @page, per_page: 10)
    @total_pages = @users.total_pages
    render :index
  end
  
  def destroy
    @user = selected_user
    if @user
      @user.destroy
      render :show
    else
      render ['Could not find user to destroy']
    end
  end

  private

  def selected_user
    User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :display_name)
  end
end