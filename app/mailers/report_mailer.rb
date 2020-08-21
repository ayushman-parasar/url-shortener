class ReportMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.report_mailer.custom_report_email.subject
  #
  def custom_report_email(email)
    mail to: email, subject: "Report"
  end
end
