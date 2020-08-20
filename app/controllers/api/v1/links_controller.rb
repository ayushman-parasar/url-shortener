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
    @link  = Link.find(shorten_url: params[:id])
    if @link
      redirect_to @link.original_url
    else
      redirect_to root_url
    end
  end

  private 

  def link_params
    params.require(:link).permit(:original_url,)
  end

  
end
