class Link < ApplicationRecord


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
