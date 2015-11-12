var dataComment = [
	{author : "Fakhri Shahab", text : "I am fakhri and i am front end developer"},
	{author : "Farwah Aliyah", text : "I am fakhri and i am a professional baker"}
]

var Comment = React.createClass({
	rawMarkup : function(){
		var rawMarkup = marked(this.props.children.toString(), {sanitize : true});
		return { __html : rawMarkup};
	},

	render : function(){
		return (
			<div className="comment">
				<span dangerouslySetInnerHTML={this.rawMarkup()}/>
			</div>
		)
	}
})

var CommentList = React.createClass({
	render : function(){
		console.log(this.props.data)
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment>
					{comment.post.content}
				</Comment>
			);
		});

		return (
			<div className="comment-list">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	render : function(){
		return (
			<div className="comment-form">
				Hello, this is my comment form.
			</div>
		);
	}
});

var CommentBox = React.createClass({
	loadCommentsFromServer : function(){
		$.ajax({
			url : this.props.url,
			dataType : 'json',
			cache : false,
			success : function(data){
				this.setState({data:data});
			}.bind(this),
			error : function(xhr, status, err){
				console.log('error')
			}.bind(this)
		})
	},
	getInitialState : function(){
		return {data : []};
	},
	componentDidMount : function(){
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render : function(){
		return(
			<div className="comment-box">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm/>
			</div>
		);		
	}
});

ReactDOM.render(
	<CommentBox data={dataComment} url='https://api.buzzbuddies.com/feed/comment_list?access_token=Ib4ccaqM781RnIPYKYBpN35YwfD1My8DUMe9WX6r&usr=3&uid=3119' pollInterval={2000}/>,
	document.getElementById('content')
)