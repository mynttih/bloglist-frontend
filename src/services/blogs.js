import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const create = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

export default { create, getAll, remove, setToken, update }