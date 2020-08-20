Rails.application.routes.draw do
 
  root "static_pages#index"
  namespace :api do
    namespace :v1 do
      resources :links
      # get "/:shorten_url" => "links#show"
    end
  end
  
  # get "/:shorten_url" => "static_pages#show"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
