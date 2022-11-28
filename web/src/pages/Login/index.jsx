import {Icon, Input} from "~/components"
import axios from "axios"
import {useFormik} from "formik"
import * as yup from "yup"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"

const validationSchema = yup.object().shape({
  email: yup.string().email("Informe um email válido!").required("Informe seu email!"),
  password: yup.string().required("Digite uma senha!")
})

const setLocalStorage = (key, dataUser) => {
  const now = new Date()
  const ttl = 3600000 //Sessão expira após 1hs
  const item = {
    ...dataUser,
    expiry: now.getTime() + ttl
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export const Login = () => {
  const navigate = useNavigate()
  const [auth] = useState(JSON.parse(localStorage.getItem("auth") || false))

  useEffect(() => {
    document.title = "Natrave - Login"
  }, [])

  useEffect(() => {
    const now = new Date()
    if (auth && now.getTime() < auth.expiry) {
      navigate("/dashboard")
    }
  }, [])

  const formik = useFormik({
    onSubmit: async (values) => {
      try {
        const response = await axios({
          method: "GET",
          baseURL: import.meta.env.VITE_API_URL,
          url: "/login",
          auth: {
            username: values.email,
            password: values.password
          }
        })

        if (response) {
          setLocalStorage("auth", response.data)
          navigate("/dashboard")
        }
      } catch (error) {
        console.log(error.response.data)
      }
    },
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema
  })

  return (
    <div>
      <header className="p-4 border-b border-red-300">
        <div className="container max-w-xl flex justify-center">
          <img src="/imgs/logo.svg" className="w-32 md:w-40" alt="" />
        </div>
      </header>
      <main className="container max-w-xl p-4">
        <div className="p-4 flex space-x-4 items-center">
          <a href="/">
            <Icon name="back" className="h-6 text-red-500" />
          </a>
          <h2 className="text-xl font-bold">Entre na sua conta</h2>
        </div>

        <form action="" className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="email"
            label="Seu e-mail"
            placeholder="Digite seu e-mail"
            error={formik.touched.email && formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            type="password"
            name="password"
            label="Sua senha"
            placeholder="Digite sua senha"
            error={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button
            type="submit"
            className="block w-full text-center text-white bg-red-500 px-6 py-3 rounded-xl font-bold disabled:opacity-50"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? "Carregando..." : "Entrar"}
          </button>
        </form>
      </main>
    </div>
  )
}
