class Api::V1::LinksController < ApplicationController
  def create
    @link = Link.new(link_params)
    @link.generate_short_link
    if @link.save
      render status: :ok, json:{notice: "Succecfully shortened url", url:@link}
    else
      render status: :unprocessable_entity, json: {notice: @link.errors.full_messages}
    end
  end

  def index
    @links = Link.all
    render status: :ok, json:{all_links: @links}
  end

  private 

  def link_params
    params.require(:link).permit(:original_url)
  end
end
