class Link < ApplicationRecord
  validates_presence_of :shorten_url, :original_url
  validates_uniqueness_of :shorten_url
  validates :original_url, format: { with: URI::regexp(%w[http https]), message: "Please enter valid URL"}

  def generate_short_link
    self.shorten_url = short_link
  end

  def short_link
    loop do 
      shorten = get_fresh_code
      break shorten unless Link.exists?(shorten_url: get_fresh_code)  
    end
  end

  def get_fresh_code
    SecureRandom.uuid[0..6]
  end
end
