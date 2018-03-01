import App from './App'
import { mount } from 'enzyme'
import React from 'react'
jest.mock('./services/blogs')
import noteService from './services/blogs'

describe.only('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })

    it('shows only login form when user is not logged in', () => {
        const loginFormComponent = app.find('.loginForm')
        const blogList = app.find('.blogList')

        expect(loginFormComponent.text()).toContain('log in to application')
        expect(blogList.length).toBe(0)
    })
})