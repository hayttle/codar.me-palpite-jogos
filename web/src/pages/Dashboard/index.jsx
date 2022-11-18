import {Icon, Card, DateSelect} from "~/components"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import {format, formatISO} from "date-fns"

export const Dashboard = () => {
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || false)
  const [result, setResult] = useState([])
  const [currentDate, setCurrentDate] = useState(formatISO(new Date(2022, 10, 20)))
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Natrave - Dashboard"
  }, [])

  const logout = () => {
    localStorage.removeItem("auth")
    navigate("/")
  }

  useEffect(() => {
    const now = new Date()
    if (!auth || now.getTime() > auth.expiry) {
      logout()
    }
  }, [])

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch(`http://localhost:3000/games?gameTime=${currentDate}`)
        const data = await response.json()
        setResult(data)
      } catch (error) {
        setResult(null)
      }
    }
    fetchGames()
  }, [currentDate])

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
          
          <DateSelect currentDate={currentDate} onChange={setCurrentDate} />

          <div className="space-y-4">
            {result.map((game) => (
              <Card
                key={game.id}
                homeTeam={{slug: game.homeTeam}}
                awayTeam={{slug: game.awayTeam}}
                match={{time: format(new Date(game.gameTime), "H:mm")}}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
