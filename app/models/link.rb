class Link < ApplicationRecord
  validates_presence_of :shorten_url, :original_url
  validates_uniqueness_of :shorten_url, :original_url, message:" has already been shortened. Kindly check below."
  validates :original_url, format: { with: URI::regexp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/), message: "is not valid"}
  default_scope { order("pinned DESC") }

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
