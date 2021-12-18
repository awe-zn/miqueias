import { usePage } from '@inertiajs/inertia-react';
import logoWhite from '../../images/logo-white.svg';

import imageHelper from '../helper/image';

export const About = () => {
  const { appEnvironment } = usePage().props;

  return (
    <>
      <section className="bg-section-index">
        <div className="container-lg py-lg-5 g-0 g-lg-4">
          <div className="row g-0 g-lg-4">
            <div className="col-lg-5 col-xl-4 offset-lg-1 order-1 order-lg-1">
              <div className="h-100 d-flex align-items-center px-awe-32 py-awe-96">
                <h1 className="m-0 fz-0">
                  <span
                    className="
                      fz-18
                      fw-normal
                      pe-3
                      bg-gradient-label-index
                      text-gray-first
                    "
                  >
                    Especialista em
                  </span>
                  <strong className="fz-40 text-brand-third d-block">
                    Direito Penal <br />e Processo Penal
                  </strong>
                </h1>
              </div>
            </div>
            <div className="col-lg-6 col-xxl-5 offset-xxl-1 order-0 order-lg-1">
              <div
                className="
                  py-lg-awe-160 py-awe-96
                  d-flex
                  align-items-center
                  justify-content-center
                  bg-brand-first
                  shadow-custom
                "
              >
                <img
                  src={imageHelper({ path: logoWhite, appEnvironment })}
                  alt="Logo do Miqueias"
                  className="img-fluid px-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-lg-nawe-96 bio-area">
        <div className="container py-awe-160 pt-lg-awe-32 gx-4">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <div>
                <span
                  className="
                    fz-18
                    fw-normal
                    pe-3
                    bg-gradient-label-index
                    text-gray-first
                  "
                >
                  Um pouco sobre mim
                </span>
                <h1
                  className="
                    fz-56
                    text-brand-second
                    fw-black
                    text-uppercase
                    mb-0
                    text-break
                  "
                >
                  Miquéias Costa
                </h1>
                <p className="text-gray-first py-2 mt-2">
                  Advogado OAB/RN <br />
                  Especialista em Direito Penal e <br />
                  Processo Penal
                </p>
                <p className="text-gray-second py-2">
                  Graduando em Economia <br />
                  Especializando em Direito Digital e <br />
                  atuante na{' '}
                  <span className="text-decoration-underline">LGPD</span>.
                </p>
                <div className="d-flex flex-column">
                  <a
                    href="tel:+5584998229875"
                    className="text-reset text-decoration-none"
                  >
                    +55 84 9822-9875
                  </a>
                  <a
                    href="mailto:atendimento@miqueiascosta.adv.br"
                    className="text-reset text-truncate"
                  >
                    atendimento@miqueiascosta.adv.br
                  </a>
                </div>
              </div>
            </div>
            <div className="ms-auto col-md-7">
              <div
                className="
                  fz-18
                  fst-italic
                  fw-light
                  text-gray-second
                  pt-awe-160
                  text-area
                "
              >
                <p>
                  A visão que tenho de advogados é que estão sempre escondidos
                  por detrás de grandes escritórios. É algo que chega a assustar
                  o cliente do direito. Algo que vai na contramão da nossa
                  missão.
                  <span className="text-brand-second">
                    Ao invés de afastar, precisamos acolher.
                  </span>
                </p>
                <p>
                  Essa é uma visão que carrego desde os primórdios da graduação
                  de Direito. Percebo vários problemas no acesso à justiça
                  brasileira.
                  <span className="text-brand-second">
                    E é isso que nos movimenta.
                  </span>
                  Carregamos o desafio de mudar esse paradigma.
                </p>
                <p>
                  Para mim o profissional do direito vai de encontro a essa
                  aplicação clássica e consolidada das prestações dos serviços
                  advocatícios. Devemos trazer ao público em geral a ideia de
                  profissionalismo, empatia, igualdade, inovação, tecnologia e
                  comodidade, com respostas rápidas e precisas, sem burocracia e
                  justiça acessível.
                </p>
                <p>
                  Orientados por esse desejo de mudança é que estamos criando um
                  escritório de advocacia 100% digital, full service, com a
                  missão ousada de ser o maior do Brasil.
                  <span className="text-brand-second">
                    Nosso foco está em você
                  </span>
                  , nosso cliente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
