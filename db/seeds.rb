# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
User.create!(display_name: "demouser", email: "demo@example.com", password: "password", reputation: 0)
User.create!(display_name: "testuser", email: "test@example.com", password: "password", reputation: 0)
User.create!(display_name: "rick", email: "rick@example.com", password: "password", reputation: 0)
User.create!(display_name: "Mr. T", email: "t@example.com", password: "password", reputation: 0)