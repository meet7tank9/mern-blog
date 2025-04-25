import React, { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token

  // redirect to login page if user is not loggedin.
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment",
    "Weather", "Uncategorized"]




  const createPost = async (e) => {
    e.preventDefault()

    const postData = new FormData()
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })

      if (response.status == 201) {
        return navigate("/")
      }
    } catch (error) {
      setError(error.response.data.message)
      console.log(error);
    }
  }

  return (
    <section className="create-post" style={{ height: 'auto', paddingTop: '50px', paddingBottom: '40px' }}>
      <div className="container">
        <h2 className='' style={{ fontSize: '33px', textAlign: 'center' }}>Create Post</h2>
        <div style={{width:'100%', height:'1px', background:"gray", margin:'10px'}}></div>
        {error &&
          <p className="form_error-message">
            {error}
          </p>
        }
        <form action="" className='form create-post_form' onSubmit={createPost}>
          <div class="create-post_label">Title of blog</div>
          <input type="text" placeholder='Enter blog title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <div class="create-post_label">Category</div>
          <select name="category" id="" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <div class="create-post_label">Content of blog</div>
          <ReactQuill modules={modules} formats={formats} className='ql-editor' value={description} onChange={setDescription} />
          <div className='create-post_label'>Image for thumbnail</div>
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
          <button type='submit' className='btn primary' style={{width:'90px'}}>Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost