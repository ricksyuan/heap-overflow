# Heap Overflow

Q&A community for developers, inspired by Stack Overflow.

#### [Live Site](https://www.heapoverflow.io/)

## Features
+ Ask a question - Get help from a community of users
+ Answer a question - Share your knowledge and solutions with others
+ Comment on questions or answers - Knowledge and code evolve. Discussion through comments helps this
+ Vote on questions, answers, or comments - Curate post quality
  - Voting immediately and persistantly affects the post owner's reputation.
+ Search - Use the search bar to find the questions you have by tags or titles
+ Badges - Earn badges for milestones, for example, asking your first question
+ Reputation - Earn reputation in the community, for example, when someone upvotes your post

## Technologies
+ This project uses React for the front-end and Ruby on Rails for the back-end with a Postgresql database.

## Code highlights
Voting was implemented to allow both efficient counter cache.
```ruby
  def vote
    vote_type = params[:vote_type]
    unless Vote.vote_types.include? vote_type
      render json: ["Unknown vote type #{vote_type}"], status: 422
      return
    end

    voter_id = current_user.id
    
    votable_type = params[:votable_type]
    votable_id = params[:votable_id]

    new_vote = Vote.new(vote_type: vote_type, voter_id: voter_id, votable_type: votable_type, votable_id: votable_id)
    @votable = new_vote.votable
    existing_vote = Vote.find_by(voter_id: voter_id, votable_type: votable_type, votable_id: votable_id)
    if existing_vote.nil?
      new_vote.save!
      @votable.addVote(new_vote);
    else
      unless new_vote.vote_type == existing_vote.vote_type
        new_vote.save!
        @votable.addVote(new_vote);
      end
      existing_vote.destroy
      @votable.undoVote(existing_vote)
    end
    render :vote
  end
```

## Local Installation

Use the command line to install the application locally.

Clone this repository
##### `git clone https://github.com/ricksyuan/heap-overflow.git`

Enter into the repository directory
##### `cd heap-overflow`

Install dependencies and run webpack
##### `npm install`

Start localhost server
##### `bundle exec rails server`

Open http://localhost:3000/ in your browser.

## Libraries

This app uses the following open source libraries:

+ [React-Quill](https://github.com/zenoamaro/react-quill) for rich-text question and answer forms
+ [react-markdown](https://github.com/rexxars/react-markdown) for rendering comments as markdown
+ [Moment](http://momentjs.com/) to display elapsed time, e.g. "Asked 47 minutes ago"

## License

MIT

---