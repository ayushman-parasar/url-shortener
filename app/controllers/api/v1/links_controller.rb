class Api::V1::LinksController < ApplicationController

  before_action :load_link, only: :show
  
  def index
    
    @links = Link.all
    
    render status: :ok, json:{all_links: @links}
  end

  
  def create
    @link = Link.new(link_params)
    @link.generate_short_link
    if @link.save
      render status: :ok, json:{notice: "Succecfully shortened url", url:@link}
    else
      render status: :unprocessable_entity, json: {notice: @link.errors.full_messages}
    end
  end

  def show 
    @link.count = @link.count + 1
    if @link.save
      render status: :ok, json:{notice: "link found", link: @link}
    else
      render status: :unprocessable_entity, json:{notice: "link cannot be incremented", errors: @link.errors.full_messages }
    end    
  end
 
  def update
    @link = Link.find_by(id: params[:id])
    if @link.update(link_params)
      render status: :ok, json:{notice: "updated successfully", link:@link}
    else
      render status: :unprocessable_entity, json:{notice: "updation unsuccessful", errors: @link.errors.full_messages}
    end
  end



 
  
  private 

  def link_params
    params.require(:link).permit(:original_url, :pinned)
  end

  def load_link
    @link  = Link.find_by(shorten_url: params[:id])
    if !@link
      render status: :not_found, json:{ errors: ["Link not found"]}
    end
  end 

  
end
