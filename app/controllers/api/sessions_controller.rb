class Api::SessionsController < ApplicationController
  
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user.nil?
      render json: ["Invalid email/password combination"], status: 401
    else
      login!(@user)
      render :session, status: 200
    end
  end

  def destroy
    @user = current_user
    if current_user.nil?
      render json: ["Nobody signed in"], status: 404 # not found
    else
      logout!
      render json: { message: 'Logout successful.' }

    end      
  end

  private
  
  def user_params
    params.require(:user).permit(:email, :password)
  end

end