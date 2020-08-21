class StaticPagesController < ApplicationController
  def index
    @link = Link.new
    @links = Link.all
    p @links
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

  def create
    email = report_params[:email]
    if email
      ReportMailer.custom_report_email(email).deliver_now
      render status: :ok, json:{notice: "email sent"}
    else
      render status: :unprocessable_entity, json:{notice: "email could not be sent"}
    end
  end
  private

    def report_params
      params.require(:report).permit(:email)
    end


end
