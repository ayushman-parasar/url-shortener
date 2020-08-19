class Link < ApplicationRecord


  def generate_short_link
    loop do 
      self.shorten_url = SecureRandom.uuid[0..6]
      break unless Link.exists?(shorten_url: shorten_url) 
    end

  end
end
