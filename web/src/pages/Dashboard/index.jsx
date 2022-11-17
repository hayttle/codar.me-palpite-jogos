import {Icon, Card, DateSelect} from "~/components"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"

export const Dashboard = () => {
  useEffect(() => {
    document.title = "Natrave - Dashboard"
 }, []);
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authenticated) {
      navigate("/login")
    }
  }, [])

  const logout = () => {
    setAuthenticated(false)
    localStorage.removeItem("authenticated")
    navigate("/")
  }

  return (
    <>
      <header className="bg-red-500 text-white p-4">
        <div className="container max-x-3xl flex justify-between p-4">
          <img src="/imgs/logo-red.svg" className="w-28 md:w-40" alt="" />
          <div className="flex flex-col justify-center">
            <a href="/profile">
              <Icon name="profile" className="w-10" />
            </a>
            <button onClick={logout}>Sair</button>
          </div>
        </div>
      </header>

      <main className="space-y-6">
        <section id="header" className="bg-red-500 text-white">
          <div className="container max-x-3xl space-y-2 p-4">
            <span>Olá Hayttle</span>
            <h3 className="text-2xl font-bold">Qual é o seu palpite</h3>
          </div>
        </section>

        <section id="content" className="container max-x-3xl p-4 space-y-4">
          <DateSelect />

          <div className="space-y-4">
            <Card homeTeam={{slug: "sui"}} awayTeam={{slug: "cam"}} match={{time: "7:00"}} />
          </div>
        </section>
      </main>
    </>
  )
}
