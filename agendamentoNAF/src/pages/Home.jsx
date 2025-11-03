import Header from "../components/header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <Header fixed />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-grow">
        <section className="flex flex-col items-center justify-center px-6 py-16">
          {/* TÍTULOS */}
          <h1 className="text-neutral-600 text-3xl font-bold font-['Roboto'] text-center mb-4">
            Seja bem-vindo
          </h1>
          <p className="text-sky-700 text-2xl font-bold font-['Roboto'] text-center max-w-3xl mb-12">
            Agende seu atendimento fiscal de forma rápida, fácil e gratuita.
            Profissionais capacitados prontos para auxiliar você!
          </p>

          {/* SUBTÍTULO */}
          <h3 className="text-neutral-600 text-xl font-bold font-['Roboto'] text-center mb-10">
            Oferecemos suporte gratuito e especializado para suas necessidades
            fiscais
          </h3>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            {/* CARD 1 */}
            <div className="bg-white rounded-2xl shadow-[0px_5px_12px_2px_rgba(0,0,0,0.25)] border border-zinc-300 p-10 flex flex-col items-center text-center ">
              <img
                src="/public/img/icone-card-11.png"
                alt="Ícone agendamento"
                className="w-12 h-14 mb-4"
              />
              <h4 className="text-black text-2xl font-bold font-['Roboto'] mb-2">
                Agendamento online
              </h4>
              <p className="text-black text-xl font-normal font-['Roboto']">
                Agende seus atendimentos de forma rápida e prática, 24 horas por
                dia.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-2xl shadow-[0px_5px_12px_2px_rgba(0,0,0,0.25)] border border-zinc-300 p-10 flex flex-col items-center text-center">
              <img
                src="/public/img/icone-card-21.png"
                alt="Ícone economia"
                className="w-14 h-12 mb-4"
              />
              <h4 className="text-black text-2xl font-bold font-['Roboto'] mb-2">
                Economia de Tempo
              </h4>
              <p className="text-black text-xl font-normal font-['Roboto']">
                Agende seus atendimentos de forma rápida e prática, 24 horas por
                dia.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-2xl shadow-[0px_5px_12px_2px_rgba(0,0,0,0.25)] border border-zinc-300 p-10 flex flex-col items-center text-center">
              <img
                src="/public/img/icone-card-31.png"
                alt="Ícone atendimento"
                className="w-12 h-12 mb-4"
              />
              <h4 className="text-black text-2xl font-bold font-['Roboto'] mb-2">
                Atendimento Especializado
              </h4>
              <p className="text-black text-xl font-normal font-['Roboto']">
                Agende seus atendimentos de forma rápida e prática, 24 horas por
                dia.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
