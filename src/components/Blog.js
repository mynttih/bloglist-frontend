import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visibility: !this.state.visibility })
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showWhenVisible = { display: this.state.visibility ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={showWhenVisible}>
          <p>{this.props.blog.url}<br/>
          {this.props.blog.likes} likes <button id={this.props.blog._id} onClick={this.props.addLike}>like</button><br/>
          added by {this.props.blog.user.name}</p>
          {this.props.user.username === this.props.blog.user.username || this.props.blog.user ?
            <button id={this.props.blog._id} onClick={this.props.deleteBlog}>delete</button> :
            null}
        </div>
      </div>
    )
  }
}

export default Blog