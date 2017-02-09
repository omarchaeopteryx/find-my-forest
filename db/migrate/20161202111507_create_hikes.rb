class CreateHikes < ActiveRecord::Migration
  def change
      create_table :hikes do |t|
        t.string :location
        t.string :description
        t.integer :rating
        t.integer :difficulty
        t.integer :user_id, null: false
        t.integer :area_id, null: false
        t.timestamps
    end
  end
end
