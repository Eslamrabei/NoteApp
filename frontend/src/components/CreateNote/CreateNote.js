import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

function CreateNote() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handelsubmit = () => {
    const note = { content };
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes/create`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: note
    }).then((res) => {
      console.log("New Note Added");
      navigate('/dashboard')
    })
  }
  const logout = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/users/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const isTokenExist = localStorage.getItem("token");
      if (isTokenExist) {
        localStorage.removeItem("token")
        navigate('/')
      }
    })
  };

  const handelDeleteAccount = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/users/delete`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      console.log("Account Deleted");
      localStorage.removeItem("token")
      navigate('/')
    })
  }

  return (
    <div>
      <nav className='bg-blue-500 text-white font-semibold p-4 rounded-[1px]  flex  '>
        <h1 className='flex-1 '>
          <Link to={'/dashboard'}>My Notes</Link>
        </h1>
        <ul className=''>
          <button className='mr-5' onClick={logout}>Log out</button>
          <button className='ml-5' onClick={handelDeleteAccount}>Delete Account</button>
        </ul>
      </nav>
      <section >
        <div className=' flex justify-center mt-[60px]'>
          <div className='bg-blue-500 w-[500px] h-[500px] relative  '>
            <textarea className='border-2 border-blue-500 absolute top-[20%] left-[10%] w-[80%] h-[40%] placeholder:text-black outline outline-[0] p-2'
              placeholder='Type Your Note'
              onChange={(e) => setContent(e.target.value)}
            >
            </textarea>
            <button className='absolute top-[70%] left-[10%] bg-blue-600 w-[142px] h-[47px] rounded-[12px] text-white font-semibold hover:bg-blue-700  '
              onClick={handelsubmit}
            >Add Note</button>
          </div>

          <div className='text-white absolute right-[60px] bottom-[10%] bg-blue-600  p-2 rounded-full cursor-pointer w-[50px] h-[50px]  font-bold text-[25px] flex justify-center items-center hover:bg-blue-700'
          >
            +
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateNote