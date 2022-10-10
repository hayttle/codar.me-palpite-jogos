import { Icon } from "~/components";

export const Dashboard = () => (
  <div className="">
    <header className="bg-red-500 text-white p-4">
      <div className="container max-x-3xl flex justify-between">
        <img src="/imgs/logo-red.svg" className="w-28 md:w-40" alt="" />
        <a href="/profile">
          <Icon name="profile" className="w-10" />
        </a>
      </div>
    </header>

    <main>
      <section id="header" className="bg-red-500 text-white p-4">
        <div className="container max-x-3xl space-y-2">
          <span>Olá Hayttle</span>
          <h3 className="text-2xl font-bold">Qual é o seu palpite</h3>
        </div>
      </section>
      <section id="content">

      </section>
    </main>
  </div>
);
