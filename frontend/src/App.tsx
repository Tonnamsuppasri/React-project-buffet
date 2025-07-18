import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import './App.css'

function App() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  try {
    const res = await axios.post('http://localhost:3001/api/login', { username, password })

    if (res.data.success) {
      await Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        timer: 1500,
        showConfirmButton: false
      })

      // สมมติ backend ส่ง user object พร้อม role มา
      const user = res.data.user
      navigate('/report', { state: { username: user.username, role: user.role } })
    }
  } catch (err: any) {
    Swal.fire({
      icon: 'error',
      title: 'เข้าสู่ระบบล้มเหลว',
      text: err.response?.data?.message || 'เกิดข้อผิดพลาด'
    })
  }
}


  return (
    <div className="index-container">
      <div className="login-container">
        {/* ด้านซ้าย */}
        <div className="leftitem flex flex-col items-center justify-center p-10 text-center text-white">
          <h1 className="shopname mb-10 text-4xl md:text-6xl font-extrabold custom-heavy-shadow">
            Buffet Shabu System
          </h1>
          <h2 className="contant-text text-lg md:text-2xl font-medium italic drop-shadow-lg tracking-wide">
            Please contact us.
          </h2>
        </div>

        {/* ด้านขวา */}
        <div className="login p-8 md:p-20">
          <div className="mb-6 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 loginname">
              LOGIN
            </h1>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <UserIcon className="h-6 w-6 text-gray-400 mr-3" />
                <input
                  type="text"
                  className="w-full outline-none"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <LockClosedIcon className="h-6 w-6 text-gray-400 mr-3" />
                <input
                  type="password"
                  className="w-full outline-none"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
