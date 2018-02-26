import React from 'react'

const BlogForm = (props) => {
    const addBlog = props.addBlog
    const author = props.author
    const handleAuthorChange = props.handleAuthorChange
    const handleTitleChange = props.handleTitleChange
    const handleUrlChange = props.handleUrlChange
    const title = props.title
    const url = props.url

    return (
        <div>
        <h3>create new</h3>
    
        <form onSubmit={addBlog}>
          <div>
            title
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
}

export default BlogForm