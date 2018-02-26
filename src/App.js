import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: '',
      blogs: [],
      error: null,
      message: null,
      password: '',
      title: '',
      url: '',
      user: null,
      username: ''
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService.create(blogObject).then(newBlog => {
      this.setState({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        blogs: this.state.blogs.concat(newBlog),
        title: '',
        author: '',
        url: ''
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 3000)
    })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  handleUrlChange = (event) => {
    this.setState({ url: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        username: '',
        password: '', 
        user
      })
    } catch(exception) {
      this.setState({
        error: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 3000)
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={this.login}>
          <div>
            username:
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <h3>create new</h3>
    
        <form onSubmit={this.addBlog}>
          <div>
            title
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={this.state.url}
              onChange={this.handleUrlChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.message} error={this.state.error} />
          <div>
            {loginForm()}
          </div>
        </div>
      )
    }

    return (
      <div>
        <Notification message={this.state.message} error={this.state.error} />
        <h2>blogs</h2>
        <p>
          {this.state.user.name} logged in 
          <button type='button' onClick={this.logout}>logout</button>
        </p>
        <div>
          {blogForm()}
        </div>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
