import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import step1 from '../../images/tutorial/step-1.png';
import step2 from '../../images/tutorial/step-2.png';
import step3 from '../../images/tutorial/step-3.png';
import step4 from '../../images/tutorial/step-4.png';
import step5 from '../../images/tutorial/step-5.png';

export default function Action() {
  return (
    <>
      <Header />
      <main>
        <section>
          <div className="container pt-awe-96 pb-awe-160">
            <div className="row justify-content-center">
              <div className="col-md-11 col-xl-10">
                <div className="row row-cols-1 gapy-awe-40">
                  <div className="col">
                    <h1 className="fz-40 fw-bold mb-4 text-blue-first">
                      Como iniciar uma Ação?
                    </h1>
                    <p className="fst-italic text-gray-second fz-24 mb-4">
                      Confira o passo-a-passo a seguir para entender como dar
                      início a uma ação judicial.
                    </p>
                  </div>
                  <div className="col">
                    <h2 className="fz-24 fw-bold mb-3 text-blue-first">
                      1. Acesse o nosso site{' '}
                      <a
                        href={`${route('homesite')}/#problems`}
                        className="link-blue-first"
                        target="_blank"
                        rel="noreferrer"
                      >
                        (link do site)
                      </a>
                    </h2>
                    <div className="text-black-first text-content mb-awe-40">
                      <p>
                        Role a página principal do site até a sessão “Em qual
                        setor você teve um problema?”.
                      </p>
                      <p>
                        Nessa etapa, você seleciona(1) em qual setor a ação que
                        deseja iniciar se encontra e clica em “prosseguir”(2).
                      </p>
                    </div>
                    <img
                      src={step1}
                      alt="Tutorial - Passo 1"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col">
                    <h2 className="fz-24 fw-bold mb-3 text-blue-first">
                      2. Detalhamento do problema, caso ou ação
                    </h2>
                    <div className="text-black-first text-content mb-awe-40">
                      <p>
                        Nesta etapa você informará os dados básicos(3) a quem
                        deseja entrar com uma ação. Descreverá um detalhamento
                        do seu caso(4), informando todas as considerações gerais
                        e importantes referentes a situação que está
                        enfrentando. Descreva sobre o problema, suas angústias,
                        o que te levou a determinada situação, como está lidando
                        com isso atualmente, o que tem medo de perder, o que
                        deseja obter ao fim da ação...Por fim, clique em
                        “prosseguir”(5)
                      </p>
                    </div>
                    <img
                      src={step2}
                      alt="Tutorial - Passo 2"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col">
                    <h2 className="fz-24 fw-bold mb-3 text-blue-first">
                      3. Adicione documentos e arquivos
                    </h2>
                    <div className="text-black-first text-content mb-awe-40">
                      <p>
                        Clicando em “selecionar arquivos”(5) você pode adicionar
                        qualquer tipo de documento ou arquivo que possa ter
                        alguma relação com a ação que deseja encaminhar. Todo
                        esse material será útil para que o advogado possa
                        entender os detalhes do caso e melhor te acompanhar para
                        obtenção de um bom resultado ao fim da ação judicial.
                      </p>
                    </div>
                    <img
                      src={step3}
                      alt="Tutorial - Passo 3"
                      className="img-fluid mb-awe-40"
                    />
                    <div className="text-black-first text-content mb-awe-40">
                      <p>
                        Após adicionar os primeiros arquivos, você pode
                        acompanhar os arquivos(6) que já anexou listados em
                        ordem. Confira e verifique se não esqueceu de anexar
                        algo. A seguir, clique em “prosseguir”(7).
                      </p>
                    </div>
                    <img
                      src={step4}
                      alt="Tutorial - Passo 4"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col">
                    <h2 className="fz-24 fw-bold mb-3 text-blue-first">
                      4. Finalizando e enviando
                    </h2>
                    <div className="text-black-first text-content mb-awe-40">
                      <p>
                        Por fim, informe seus dados(8) básicos para contato.
                        Será por meio deles que entraremos em contato para lhe
                        informar sobre o seu caso e detalhes de como poderá
                        iniciar a ação corretamente, optando pelo melhor
                        direcionamento para o seu caso específico. Finalizando,
                        clique em “Enviar informações do caso”(9)
                      </p>
                    </div>
                    <img
                      src={step5}
                      alt="Tutorial - Passo 5"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col">
                    <h2 className="fz-24 fw-bold mb-3 text-blue-first">
                      Próximos passos...
                    </h2>
                    <div className="text-black-first text-content">
                      <p>
                        Ao enviar suas informações e do caso, você receberá um
                        retorno pelo e-mail que cadastrou em até 72h. Por lá,
                        explicaremos a melhor maneira que você pode seguir com o
                        seu problema, seja iniciando uma ação ou resolvendo de
                        outra maneira que venha a atender as suas necessidades.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
