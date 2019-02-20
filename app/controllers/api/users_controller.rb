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
      render 'api/users/show'
      return
    end
    # normal sign in
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # Modify user info
  def update        
    @user = selected_user # selected_user is a private helper method
    if @user && user.update_atributes(user_params)
      render :show
    elsif !@user
      render json: ['Could not locate user'], status: 400 # Bad request
    else
      render json: @user.errors.full_messages, status: 401 # Unauthorized
    end
  end

  # Get all relevent info for user profile
  def show
    @user = selected_user
  end


  def index
    @users = User.all
  end

  def destroy
    @user = selected_user
    if @user
      @user.destroy
      render :show
    else
      # TODO: Update render message?
      render ['Could not find user']
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