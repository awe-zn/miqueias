import { useForm, usePage } from '@inertiajs/inertia-react';

import imageHelper from '../../helper/image';

import logo from '../../../images/logo.svg';

export default function Login() {
  const { appEnvironment } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    post(route('login'));
  };

  return (
    <main>
      <section>
        <div className="container">
          <div className="row justify-content-center min-vh-100 align-items-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <form
                className="p-awe-32 bg-white rounded shadow d-flex flex-column"
                onSubmit={handleSubmit}
              >
                <img
                  src={imageHelper({ appEnvironment, path: logo })}
                  alt="Miqueias Costa"
                  className="img-fluid logo-login mx-auto mb-4"
                />
                <div className="d-flex flex-column gapy-4">
                  <div>
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? 'is-invalid' : ''
                      }`.trim()}
                      id="email"
                      placeholder="Digite seu e-mail"
                      value={data.email}
                      onChange={({ target: { value } }) =>
                        setData('email', value)
                      }
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="form-label">
                      Senha
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                      }`.trim()}
                      id="password"
                      placeholder="Digite sua senha"
                      value={data.password}
                      onChange={({ target: { value } }) =>
                        setData('password', value)
                      }
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>
                <a href="/" className="link-blue-first mt-2 fw-semibold">
                  Esqueceu sua senha?
                </a>
                <button
                  type="submit"
                  className="btn btn-blue-first fw-bold mt-4"
                  disabled={processing}
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
