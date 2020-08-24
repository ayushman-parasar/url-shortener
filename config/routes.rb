Rails.application.routes.draw do
 
  root "static_pages#index"
  get "/:id"=>"static_pages#show"
  namespace :api do
    namespace :v1 do
      resources :links
    end
  end
  resources :static_pages
end
