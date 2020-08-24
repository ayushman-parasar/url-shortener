class StaticPagesController < ApplicationController
  before_action :email_lookup, only: :create

  def index
    
    @links = Link.all
    p @links
  end

  def create
    report_object = ReportMailer.custom_report_email(@email).deliver_now
     
    if report_object
      render status: :ok, json:{notice: "email sent"}
    else
      render status: :not_implemented, json:{notice: "email could not be sent"} 
    end
  end

  def show
    # p params
    # @link  = Link.find_by(shorten_url: params[:id])
    @link  = Link.find_by_shorten_url(params[:id])
    if @link
      p @link.original_url
      redirect_to @link.original_url
    else
      redirect_to root_url
    end
  end

  private
    def report_params
      params.require(:report).permit(:email)
    end

    def email_lookup
      @email  = report_params[:email]
      if @email.empty? 
        render status: :unprocessable_entity, json:{ notice: ["Please enter a proper email"]}
      end
    end

end
