# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
User.create!(username: "demouser", email: "demo@example.com", password: "password", reputation: 0)
User.create!(username: "testuser", email: "test@example.com", password: "password", reputation: 0)
User.create!(username: "rick", email: "rick@example.com", password: "password", reputation: 0)
User.create!(username: "a", email: "a@a.com", password: "password", reputation: 0)