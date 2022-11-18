import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {Icon, Card, DateSelect} from "~/components"

export const Profile = () => {
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Natrave - Profile"
  }, [])

  useEffect(() => {
    const now = new Date()
    if (!auth || now.getTime() > auth.expiry) {
      navigate("/")
    }
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
            <h3 className="text-2xl font-bold">Hayttle Soljnivisk</h3>
          </div>
        </section>

        <section id="content" className="container max-x-3xl p-4 space-y-4">
          <h2 className="text-red-500 text-xl font-bold">Seus palpites</h2>

          <DateSelect />

          <div className="space-y-4">
            <Card homeTeam={{slug: "sui"}} awayTeam={{slug: "cam"}} match={{time: "7:00"}} />
            <Card homeTeam={{slug: "uru"}} awayTeam={{slug: "cor"}} match={{time: "7:00"}} />
            <Card homeTeam={{slug: "por"}} awayTeam={{slug: "gan"}} match={{time: "7:00"}} />
          </div>
        </section>
      </main>
    </>
  )
}
