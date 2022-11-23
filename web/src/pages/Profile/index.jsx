import {format, formatISO} from "date-fns"
import {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {Icon, Card, DateSelect} from "~/components"
import {ptBR} from "date-fns/locale"


export const Profile = () => {
  const params = useParams()
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || false)
  const [games, setGames] = useState([])
  const [user, setUser] = useState([])
  const [currentDate, setCurrentDate] = useState(formatISO(new Date(2022, 10, 20)))
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Natrave - Palpites"
  }, [])
 
  useEffect(() => {
    async function fetchHunches() {
      try {
        const response = await fetch(`http://localhost:3000/${params.username}`)
        const data = await response.json()

        const hunches = data.hunches.reduce((acc, hunch) => {
          acc[hunch.gameId] = hunch
          return acc
        }, {})
        setUser({...data,hunches})
      } catch (error) {
        setUser(null)
      }
    }
    fetchHunches()
  },[])

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
        </div>
      </header>

      <main className="space-y-6">
        <section id="header" className="bg-red-500 text-white">
          <div className="container max-x-3xl space-y-2 p-4">
            <a href="/dashboard">
              <Icon name="back" className="w-10" />
            </a>
            <h3 className="text-2xl font-bold">{user.name}</h3>
          </div>
        </section>

        <section id="content" className="container max-x-3xl p-4 space-y-4">
          <h2 className="text-red-500 text-xl font-bold">Palpites</h2>

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
                  homeTeamScore={user.hunches[game.id]?.homeTeamScore || ""}
                  awayTeamScore={user.hunches[game.id]?.awayTeamScore || ""}
                  disabled={true}
                />
              ))}
          </div>
        </section>
      </main>
    </>
  )
}
