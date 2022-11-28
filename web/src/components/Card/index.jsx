import {useFormik} from "formik"
import * as yup from "yup"
import {useState} from "react"

const validationSchema = yup.object().shape({
  homeTeamScore: yup.string().required(),
  awayTeamScore: yup.string().required()
})

export const Card = ({gameId, homeTeam, awayTeam, gameTime, homeTeamScore, awayTeamScore, disabled}) => {
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")))
  const formik = useFormik({
    onSubmit: (values) => {
      fetch(`${import.meta.env.VITE_API_URL}/hunches`, {
        method: "POST",
        body: JSON.stringify({...values, gameId}),
        headers: {"Content-type": "application/json; charset=UTF-8", authorization: `Bearer ${auth.accessToken}`}
      })
    },
    initialValues: {
      homeTeamScore,
      awayTeamScore
    },
    validationSchema
  })
  return (
    <div className="rounded-xl border border-gray-300 p-4 text-center space-y-4">
      <span className="text-sm md:text-base text-gray-700 font-bold">{gameTime}</span>
      <form className="flex space-x-4 justify-center items-center">
        <span className="uppercase">{homeTeam}</span>
        <img src={`/imgs/flags/${homeTeam}.png`} alt="" />

        <input
          className="bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center"
          type="number"
          name="homeTeamScore"
          id=""
          min="0"
          value={formik.values.homeTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />
        <span className="text-red-500 font-bold">X</span>
        <input
          className="bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center"
          type="number"
          name="awayTeamScore"
          id=""
          min="0"
          value={formik.values.awayTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />

        <img src={`/imgs/flags/${awayTeam}.png`} alt="" />
        <span className="uppercase">{awayTeam}</span>
      </form>
    </div>
  )
}
