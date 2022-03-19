import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => (
  <footer className="bg-gray-fourth">
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-md-11 col-lg-10">
          <div className="d-flex flex-row justify-content-between flex-wrap gapx-awe-32 gapy-3 align-items-center fz-14 text-blue-first">
            <span>
              Miquéias Costa - 2021{' '}
              <a
                href={route('terms')}
                className="link-brand-first text-decoration-none transition"
              >
                Termos
              </a>{' '}
              e{' '}
              <a
                href={route('privacy')}
                className="link-brand-first text-decoration-none transition"
              >
                Políticas de Privacidade
              </a>
            </span>
            <div className="d-flex flex-row gapx-4 ms-auto">
              <FaFacebook size={24} />
              <a
                href="//instagram.com/miqueiascadv"
                target="_blank"
                rel="noreferrer"
                className="link-blue-first text-decoration-none"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="//api.whatsapp.com/send?phone=5584994207332&text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20em%20contato%20com%20o%20atendimento!"
                target="_blank"
                rel="noreferrer"
                className="link-blue-first text-decoration-none"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
