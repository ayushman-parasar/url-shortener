class CreateLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :links do |t|
      t.string "original_url", null: false
      t.string "shorten_url", null: false
      t.integer "count", default: 0
      t.boolean "pinned", default:false, null:false

      t.timestamps
    end
  end
end
