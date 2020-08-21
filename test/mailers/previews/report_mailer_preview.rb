# Preview all emails at http://localhost:3000/rails/mailers/report_mailer
class ReportMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/report_mailer/custom_report_email
  def custom_report_email
    ReportMailer.custom_report_email
  end

end
