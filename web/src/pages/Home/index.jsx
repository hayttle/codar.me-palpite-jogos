const Title = ({children, ...props}) => <h1 {...props}>{children}</h1>

import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || false)

  useEffect(() => {
    document.title = "Natrave - Home"
 }, []);

 useEffect(() => {
    const now = new Date()
    if (auth && now.getTime() < auth.expiry) {
      navigate("/dashboard")
    }
  }, [])

  return (
    <div className="h-screen bg-red-700 text-white flex flex-col items-center p-4 space-y-6">
      <header className="container flex justify-center max-w-5xl p-4">
        <img src="/imgs/logo-white.svg" className="w-40" alt="" />
      </header>
      <div className="container max-w-5xl flex-1 p-4 flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <div className="md:flex-1 flex justify-center">
          <img src="/imgs/photo.svg" className="w-full max-w-md" alt="" />
        </div>
        <div className="md:flex-1 flex flex-col space-y-6">
          <h1 className="text-3xl text-center md:text-left font-bold">
            Dê o seu palpite na Copa do Mundo do Catar 2022!
          </h1>
          <a href="/signup" className="text-center text-red-700 bg-white text-xl px-8 py-4 rounded-xl">
            Criar minha conta
          </a>
          <a href="/login" className="text-center text-white border border-white text-xl px-8 py-4 rounded-xl">
            Fazer login
          </a>
        </div>
      </div>
    </div>
  )
}
