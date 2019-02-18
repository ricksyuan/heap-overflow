# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'nokogiri'
require 'faker'

# Clear existing data
User.delete_all
Question.delete_all
Tag.delete_all
Answer.delete_all
Tagging.delete_all
Vote.delete_all
Comment.delete_all


demo_user = User.create!(
  display_name: 'demouser',
  email: 'demo@example.com',
  password: "password"
)

xml_file = File.read(File.join(__dir__, 'post_seeds.xml'))
doc = Nokogiri::XML.parse(xml_file)

doc.xpath('//row').each_with_index do |row_element, index|  
  display_name = Faker::TvShows::SiliconValley.unique.character # => "Jian Yang"      #=> "Christophe Bartell"
  email = "#{display_name.split(' ').join('.')}@example.com"

  user = User.create!(
    display_name: display_name,
    email: email,
    password: "password"
  )

  question = Question.create!(
  
    views: row_element.xpath('@ViewCount').text.to_i,
    asker_id: user.id,
    editor_id: user.id,
    title: row_element.xpath('@Title').text,
    body: row_element.xpath('@Body').text
  )
end