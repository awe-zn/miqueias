import { usePage, Link } from '@inertiajs/inertia-react';

import imageHelper from '../helper/image';

import logo from '../../images/logo.svg';

export const Header = () => {
  const { appEnvironment, user } = usePage().props;

  return (
    <header className="shadow">
      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-5 col-md-3">
            <Link href={route('homesite')}>
              <img
                src={imageHelper({ appEnvironment, path: logo })}
                alt="logo"
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="col-auto d-md-none ms-auto">
            <button
              className="hamburguer collapsed"
              type="button"
              data-bs-target="#nav"
              data-bs-toggle="collapse"
            >
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </button>
          </div>
          <div className="col-md-auto ms-md-auto">
            <div className="d-md-block collapse" id="nav">
              <div className="d-flex flex-column flex-md-row gapy-3 gapx-awe-64 align-items-md-center mt-awe-32 mt-md-0">
                <Link
                  href={route('about')}
                  className="link-blue-first text-decoration-none fw-semibold text-truncate"
                >
                  Sobre
                </Link>
                <Link
                  href={route('action')}
                  className="link-blue-first text-decoration-none fw-semibold text-truncate"
                >
                  Como iniciar uma ação?
                </Link>
                <Link
                  href={`${route('homesite')}/#question`}
                  className="link-blue-first text-decoration-none fw-semibold text-truncate"
                >
                  Perguntas frequentes
                </Link>
                <Link
                  href={user ? route('home') : route('login')}
                  className="btn btn-outline-blue-first fw-bold border-2 text-truncate"
                >
                  {user ? 'Acessar sistema' : 'Login'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
