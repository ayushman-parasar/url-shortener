class Link < ApplicationRecord
  validates_presence_of :shorten_url, :original_url
  validates_uniqueness_of :shorten_url

  def generate_short_link
    self.shorten_url = fresh_short_code
  end

  def fresh_short_code
    loop do 
      shorten = SecureRandom.uuid[0..6]
      break shorten unless Link.exists?(shorten_url: shorten) 
    end
  end
end
