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
