import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Delete() {
  const [note, setNote] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios({
    method: "GET",
    url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
  }).then((res) => {
    setNote(res.data.content)
  }).catch((e) => {
    console.log(e);
  })

  const handelclickYes = async () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(navigate('/dashboard'))
  }

  const handelclickNo = () => {
    navigate('/dashboard')
  }


  return (
    <>
      
      <section className='main-form  flex justify-center items-center w-full h-[100vh]' >
        <div className='w-[350px] h-[250px] bg-blue-500 p-5  '>
          <h2 className='text-white font-semibold mb-5  '>Are You Sure To Delete: <br className='sm-block hidden' />{note}</h2>

          <div className='flex flex-row justify-center items-center gap-[40px]'>
            <button className='bg-blue-600 p-3 rounded-[12px] text-white font-semibold  '
              onClick={handelclickNo}
            >No</button>
            <button onClick={handelclickYes} className='bg-blue-600 p-3 rounded-[12px] text-white font-semibold  '>Yes</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Delete