class StaticPagesController < ApplicationController
  def index
    @link = Link.new
    @links = Link.all
  end

  def show
    p params
    @link  = Link.find_by(shorten_url: params[:shorten_url])
    if @link
      p @link.original_url
      redirect_to @link.original_url
    else
      redirect_to root_url
    end
  end


end
