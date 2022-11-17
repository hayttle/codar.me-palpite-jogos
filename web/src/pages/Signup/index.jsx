import {Icon, Input} from "~/components"
import axios from "axios"
import {useFormik} from "formik"
import * as yup from "yup"
import {useEffect} from "react"

const validationSchema = yup.object().shape({
  name: yup.string().required("Preencha seu nome!"),
  username: yup.string().required("Preencha seu usuário!"),
  email: yup.string().email("Informe um email válido!").required("Informe seu email!"),
  password: yup.string().required("Digite uma senha!")
})

export const Signup = () => {
  useEffect(() => {
    document.title = "Natrave - Signup"
  }, [])
  const formik = useFormik({
    onSubmit: async (values) => {
      const response = await axios({
        method: "POST",
        baseURL: "http://localhost:3000",
        url: "/users",
        data: values
      })

      //TODO: response.data
    },
    initialValues: {
      name: "",
      username: "",
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
          <h2 className="text-xl font-bold">Crie sua conta</h2>
        </div>
        <form action="" className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Seu nome"
            placeholder="Digite seu nome"
            error={formik.touched.name && formik.errors.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            type="text"
            name="username"
            label="Seu nome de usuário"
            placeholder="Digite um nome de usuário"
            error={formik.touched.username && formik.errors.username}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

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
            {formik.isSubmitting ? "Carregando..." : "Criar minha conta"}
          </button>
        </form>
      </main>
    </div>
  )
}
