class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?
  
  private

  def current_user
    # Disambiguate between if session token does not exist and if session there is no user with the current session token
    # Check for session token
    return nil unless session[:session_token]
    # Return user associated with the session token
    @current_user ||= User.find_by(session_token: session[:session_token])
  end
  
  def login!(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

  def require_logged_in
    # Redirect user login for certain pages
    unless current_user
      render json: { base: ['invalid credentials'] }, status: 401
    end
  end

end
