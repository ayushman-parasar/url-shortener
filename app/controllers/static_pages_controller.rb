class StaticPagesController < ApplicationController
  def index
    @link = Link.new
    @links = Link.all
    p @links
  end

  def create
    email = report_params[:email]
<<<<<<< HEAD
    p "hello"
    unless email.empty?
      report_object = ReportMailer.custom_report_email(email).deliver_now
      if report_object
        render status: :ok, json:{notice: "email sent"}
      else
        render status: :not_implemented, json:{errors:["This service is not available at the moment"]}
      end 
=======
    if email
      ReportMailer.custom_report_email(email).deliver_now
      render status: :ok, json:{notice: "email sent"}
    else
      render status: :unprocessable_entity, json:{notice: "email could not be sent"}
>>>>>>> 21a4f3a5b3585c9ec2558115e95268e884047d60
    end
    render status: :unprocessable_entity, json:{notice: "email could not be sent"}  
  end

  private
    def report_params
      params.require(:report).permit(:email)
    end



end
