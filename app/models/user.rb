# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  display_name    :string           not null
#  reputation      :integer          default(0), not null
#  photo_id        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    
  # validations
  validates :display_name, presence: true, length: {minimum: 3}
  validates :email, :email_hash, presence: true, uniqueness: true
  validates :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  
  after_initialize :ensure_session_token
  
  # associations
  has_many :questions, foreign_key: :author_id, dependent: :destroy
  has_many :answers, foreign_key: :author_id, dependent: :destroy
  has_many :comments, foreign_key: :author_id, dependent: :destroy
  has_many :votes, foreign_key: :voter_id, dependent: :destroy

  # allows validation of password length without storing password in DB
  attr_reader :password
  
  # reputation methods

  def changeReputationFor(event)
    case event
    when 'RECEIVE_UPVOTE'        
      self.improveReputation(10)
    when 'RECEIVE_DOWNVOTE'
      self.loseReputation(10)
    else
      'Cannot change reputation for unknown event: #{event}'
    end        
  end

  # auth methods
  
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def email=(email)
    self.email_hash ||= Digest::MD5.hexdigest(email)
    super(email)
  end 

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def improveReputation(amt)
    self.update(reputation: self.reputation + amt)
  end

  def loseReputation(amt)
    reputation = self.reputation
    self.update(reputation: reputation - amt)
  end

end
