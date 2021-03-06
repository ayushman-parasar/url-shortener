require 'test_helper'

class LinkTest < ActiveSupport::TestCase
  
  def setup
    @link = Link.new(original_url:"https://stackoverflow.com/questions/16904658/node-version-manager-install-nvm-command-not-found")
    @link.generate_short_link
    @link.save
  end

  test "shorten url must be unique" do
    link2 = Link.new(original_url: "https://www.google.com", shorten_url: @link.shorten_url)
    assert_not link2.valid?
  end 

  test "original url must not be empty" do
    @link.original_url = ""
    assert_not @link.valid?
  end

  test "original url should be in proper format" do
    @link.original_url = "ddsadsadasd"
    assert_not @link.valid?
  end
 
end
