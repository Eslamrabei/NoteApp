
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate} from "react-router";
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'


function Dashboard() {
  const navigate = useNavigate();
  const [note, setNote] = useState([]);
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
  const AddNote = () => {
    const token = localStorage.getItem("token");

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setNote(res.data)
    }).catch((e) => {
      console.log(e);
    })
  }

  useEffect(() => {
    AddNote()
  }, [])

  useEffect(() => {
    AddNote()
  }, [setNote])

  ///////////////////////////swal 
  // const { id } = useParams();
  // const deleteNote = async (note) => {
  //   const token = localStorage.getItem("token");
  //   Swal.fire({
  //     title: `Are U Sure to Delete: '${note.id} '`,
  //     showCancelButton: true,
  //   }).then((data) => {
  //     if (data.isConfirmed) {
  //       axios({
  //         method: "DELETE",
  //         url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes/${note.id}`,
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }).then(
  //         Swal.fire('Delete!', '', 'success')
  //       )
  //     }
  //   })
  // }






  return (
    <div>
      <nav className='bg-blue-500 text-white font-semibold md:p-4  rounded-[1px]  flex p-4 '>
        <h1 className='flex-1 '>
          <Link to={'/dashboard'}>My Notes</Link>
        </h1>
        <ul className=''>
          <button className='mr-5' onClick={logout}>Log out</button>
          <button className='ml-5' onClick={handelDeleteAccount}>Delete Account</button>
        </ul>
      </nav>
      <section >
        <div className=' flex justify-center mt-[60px] '>
          <div className='bg-blue-100 w-[500px] h-[500px] relative  lg:w-full lg:h-full lg:mx-2 lg:rounded-[10px] '>


            <div className='p-4 ' >
              {!note || (note.length === 0 && (
                <h2 >No Notes Found</h2>
              ))}
              {note && note.map((note) => (
                <div key={note.id}>
                  <div className='hover:bg-blue-200 p-3  rounded-[5px] my-3 '>
                    <div className='relative'>
                      {note.content}
                        <Link to={`/delete/${note._id}`} >
                          <DeleteIcon className='absolute right-0' />
                        </Link>
                      {/* <button onClick={deleteNote} > <DeleteIcon /> </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <Link to={'/create'}>
            <div className='text-white absolute right-[60px] bottom-[10%] bg-blue-600  p-2 rounded-full cursor-pointer w-[50px] h-[50px]  font-bold text-[25px] flex justify-center items-center hover:bg-blue-700 
              sm:bottom-[15%] 
            '
            >
              +
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Dashboard