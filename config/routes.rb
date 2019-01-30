Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :questions, only: [:index, :show, :create, :update] do
      resources :answers, only: [:create, :update, :destroy]
    end
    # resources :comments, only: [:create, :update, :destroy]
    resources :tags, only: [:index, :update, :destroy]
  end
  
end
