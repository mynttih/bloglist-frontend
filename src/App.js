//import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import React from 'react'
import SortedBlogList from './components/SortedBlogList'
import Togglable from './components/Togglable'

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

  addLike = (event) => {
    const blog = this.state.blogs.find(blog => blog._id === event.target.id)

    const blogToUpdate = {
      id: blog._id,
      userId: blog.user,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService.update(blogToUpdate).then(updatedBlog =>
      this.setState({
        blogs: this.state.blogs.map(blog => blog._id !== updatedBlog._id ? blog : updatedBlog)
      })
    )
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

  deleteBlog = (event) => {
    const id = event.target.id
    const blogToDelete = this.state.blogs.find(blog => blog._id.toString() === id)

    if (window.confirm(`delete ${blogToDelete.title} by ${blogToDelete.author}`))
    blogService.remove(id).then(response =>
      this.setState({ blogs: this.state.blogs.filter(blog => blog._id.toString() !== id)})
    )
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
        username: '',
        password: ''
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
    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.message} error={this.state.error} />
          <LoginForm
            handlePasswordChange={this.handlePasswordChange}
            handleUsernameChange={this.handleUsernameChange}
            login={this.login}
            password={this.state.password}
            username={this.state.username}
          />
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
        <Togglable buttonLabel='new blog'>
          <BlogForm
            addBlog={this.addBlog}
            author={this.state.author}
            handleAuthorChange={this.handleAuthorChange}
            handleTitleChange={this.handleTitleChange}
            handleUrlChange={this.handleUrlChange}
            title={this.state.title}
            url={this.state.url}
          />
        </Togglable>
        <SortedBlogList
          addLike={this.addLike}
          deleteBlog={this.deleteBlog}
          blogs={this.state.blogs}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
