import Blog from './Blog'
import React from 'react'

const SortedBlogList = (props) => {
    const addLike = props.addLike
    const deleteBlog = props.deleteBlog
    const sortedBlogs = props.blogs.sort((blog1, blog2) => blog1.likes < blog2.likes)
    const user = props.user

    return (
        <div>
            {sortedBlogs.map(blog => 
                <Blog
                    key={blog._id}
                    blog={blog}
                    addLike={addLike}
                    deleteBlog={deleteBlog}
                    user={user}
                />
            )}
        </div>
    )
}

export default SortedBlogList