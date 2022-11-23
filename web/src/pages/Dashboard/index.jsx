import {Icon, Card, DateSelect} from "~/components"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import {format, formatISO} from "date-fns"
import {ptBR} from "date-fns/locale"

export const Dashboard = () => {
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || false)
  const [currentDate, setCurrentDate] = useState(formatISO(new Date(2022, 10, 20)))

  const [games, setGames] = useState([])
  const [hunches, setHunches] = useState([])

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
    async function fetchHunches() {
      try {
        const response = await fetch(`http://localhost:3000/${auth.user.username}`)
        const data = await response.json()

        const hunches = data.hunches.reduce((acc, hunch) => {
          acc[hunch.gameId] = hunch
          return acc
        }, {})
        setHunches(hunches)
      } catch (error) {
        setHunches(null)
      }
    }
    fetchHunches()
  }, [currentDate])

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch(`http://localhost:3000/games`)
        const data = await response.json()
        setGames(data)
      } catch (error) {
        setGames(null)
      }
    }
    fetchGames()
  }, [])

  return (
    <>
      <header className="bg-red-500 text-white p-4">
        <div className="container max-x-3xl flex justify-between p-4">
          <img src="/imgs/logo-red.svg" className="w-28 md:w-40" alt="" />
          <div className="flex flex-col justify-center">
            <a href={`/${auth?.user?.username}`}>
              <Icon name="profile" className="w-10" />
            </a>
            <button onClick={logout}>Sair</button>
          </div>
        </div>
      </header>

      <main className="space-y-6">
        <section id="header" className="bg-red-500 text-white">
          <div className="container max-x-3xl space-y-2 p-4">
            <span>Olá, {auth.user.name}</span>
            <h3 className="text-2xl font-bold">Qual é o seu palpite</h3>
          </div>
        </section>

        <section id="content" className="container max-x-3xl p-4 space-y-4">
          <DateSelect currentDate={currentDate} onChange={setCurrentDate} />

          <div className="space-y-4">
            {games
              .filter((game) => {
                const gameTime = format(new Date(game.gameTime), "d 'de' MMMM", {locale: ptBR})
                const date = format(new Date(currentDate), "d 'de' MMMM", {locale: ptBR})
                return gameTime === date
              })
              .map((game) => (
                <Card
                  key={game.id}
                  gameId={game.id}
                  homeTeam={game.homeTeam}
                  awayTeam={game.awayTeam}
                  gameTime={format(new Date(game.gameTime), "H:mm")}
                  homeTeamScore={String(hunches[game.id]?.homeTeamScore) || ""}
                  awayTeamScore={String(hunches[game.id]?.awayTeamScore) || ""}
                />
              ))}
          </div>
        </section>
      </main>
    </>
  )
}
