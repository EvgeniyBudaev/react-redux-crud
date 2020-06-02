import axios from 'axios'

export class ApiService {
  
  _apiBase = "https://react-redux-tutorial-feccd.firebaseio.com"
  _urlBlog = "/blogs.json"

  getResource = async url => {
    const result = axios.get(`${this._apiBase}${url}`)
      .then(({ data }) => {
        if (data) {
          const items = Object.keys(data).map(itemId => {
            return { ...data[itemId], id: itemId }
          });
          return items;
        }
      })
    return result;
  }

  getBlogs = async () => {
    try {
      const blogs = await this.getResource(`${this._urlBlog}`);
      console.log('[api-service][getBlogs] ', blogs)
      return blogs;
    } catch (err) {
      console.log(err);      
    }
  }

  addBlog = async (newBlog) => {
    try {
      await axios.post(
        `${this._apiBase}${this._urlBlog}`,
        newBlog
      ).then(responce => console.log("[api-service][addBlog][responce] ", responce))
    } catch (err) {
      console.log(err);
    }
  }


  editBlog = async (blogId, newBlog) => {
    try {
      await axios.put(
        `${this._apiBase}/blogs/${blogId}.json`,
        newBlog
      ).then(responce => console.log("[api-service][editBlog][responce] ", responce))
    } catch (err) {
      console.log(err);
    }
  }

  deleteBlog = async (blogId) => {
    try {
      await axios.delete(
        `${this._apiBase}/blogs/${blogId}.json`,
        blogId
      ).then(responce => console.log("[api-service][deleteBlog][responce] ", responce))
    } catch (err) {
      console.log(err);
    }
  }
}