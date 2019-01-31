Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :questions, only: [:index, :show, :create, :update] do
      # member do
      #   post 'upvote'
      #   delete 'upvote/undo'
      #   post 'downvote'
      #   delete 'downvote/undo'
      # end
      resources :answers, only: [:create]
    end
    resources :answers, only: [:update, :destroy] do
    #   member do
    #     post 'upvote'
    #     delete 'upvote/undo'
    #     post 'downvote'
    #     delete 'downvote/undo'
    #   end
    # end
    # resources :votes, only: [:create, :destroy]
    # resources :comments, only: [:create, :update, :destroy]
    resources :tags, only: [:index, :update, :destroy]
  end
  
end
