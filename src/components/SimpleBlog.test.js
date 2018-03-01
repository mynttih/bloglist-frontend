import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders blog title, author and number of likes', () => {
        const blog ={
            author: 'Michael Chan',
            title: 'React patterns',
            likes: 6
        } 

        const mockHandler = jest.fn()
        
        const blogComponent = shallow(
            <SimpleBlog
                blog={blog}
                onClick={mockHandler}
            />
        )

        const blogInfoDiv = blogComponent.find('.blogInfo')
        const likesDiv = blogComponent.find('.likes')

        expect(blogInfoDiv.text()).toContain(`${blog.title} ${blog.author}`)
        expect(likesDiv.text()).toContain(`blog has ${blog.likes} likes`)
    })

    it('clicking the button twice calls event handler twice', () => {
        const blog ={
            author: 'Michael Chan',
            title: 'React patterns',
            likes: 6
        }

        const mockHandler = jest.fn()
        
        const blogComponent = shallow(
            <SimpleBlog
                blog={blog}
                onClick={mockHandler}
            />
        )

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})