class User < ApplicationRecord
    
    # validations
    validates :username, presence: true, uniqueness: true
    validates :password_digest, :session_token, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}
    
    after_initialize :ensure_session_token
    after_initialize :ensure_session_token
    
    # associations
    # TODO: Write associations
    has_many :questions,
      primary_key: :id,
      foreign_key: :question_id,
      class_name: :Question

      has_many :answers,
      primary_key: :id,
      foreign_key: :answer_id,
      class_name: :Answer

      has_many :question_comments,
      primary_key: :id,
      foreign_key: :comment_id,
      class_name: :Comment

    # allows validation of password length without storing password in DB
    attr_reader :password
    
    
    # reputation

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
    
    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
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

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    private

    def improveReputation(amt)
        @reputation += amt
    end

    def loseReputation(amt)
        if amt > self.reputation
            @reputation = 0
        else
            @reputation -= amt
        end
    end

end