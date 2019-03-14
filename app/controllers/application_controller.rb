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
      render json: ['Must be logged in.'], status: 401
    end
  end

  def award_feature_badges
    # Award bronze badge if first question, comment, or answer
    question_count = current_user.questions.count
    answer_count = current_user.answers.count
    comment_count = current_user.comments.count
    vote_count = current_user.votes.count
    met_conditions_count = 0

    # Bronze badge
    if question_count == 1 && !Badge.find_by(user_id: current_user.id, name: "First Question")
      Badge.create!(user_id: current_user.id, badge_type: 3, name: "First Question");
      met_conditions_count += 1
    elsif question_count >= 1
      met_conditions_count += 1
    end
    if answer_count == 1 && !Badge.find_by(user_id: current_user.id, name: "First Answer")
      Badge.create!(user_id: current_user.id, badge_type: 3, name: "First Answer");
      met_conditions_count += 1
    elsif answer_count >= 1
      met_conditions_count += 1
    end
    if comment_count == 1 && !Badge.find_by(user_id: current_user.id, name: "First Comment")
      Badge.create!(user_id: current_user.id, badge_type: 3, name: "First Comment");
      met_conditions_count += 1
    elsif comment_count >= 1
      met_conditions_count += 1
    end
    if vote_count == 1 && !Badge.find_by(user_id: current_user.id, name: "First Vote")
      Badge.create!(user_id: current_user.id, badge_type: 3, name: "First Vote");
      met_conditions_count += 1
    elsif vote_count >= 1
      met_conditions_count += 1
    end
    
    # Silver badge
    if met_conditions_count == 4 && !Badge.find_by(user_id: current_user.id, name: "Feature pro")
      Badge.create!(user_id: current_user.id, badge_type: 2, name: "Feature pro");
    end
    
  end

end
