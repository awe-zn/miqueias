import { Link, useForm, usePage } from '@inertiajs/inertia-react';

import UnAuthLayout from '../../layout/UnAuth';

export default function RecoveryPassword() {
  const {
    request: { email, token },
  } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    email,
    token,
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    post(route('password.update'));
  };

  return (
    <UnAuthLayout>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
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
              onChange={({ target: { value } }) => setData('email', value)}
              disabled
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Nova senha
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.password ? 'is-invalid' : ''
              }`.trim()}
              id="password"
              placeholder="Digite sua nova senha"
              value={data.password}
              onChange={({ target: { value } }) => setData('password', value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div>
            <label htmlFor="password_confirmation" className="form-label">
              Confirmar senha
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.password ? 'is-invalid' : ''
              }`.trim()}
              id="password_confirmation"
              placeholder="Confirme sua nova senha"
              value={data.password_confirmation}
              onChange={({ target: { value } }) =>
                setData('password_confirmation', value)
              }
            />
            {errors.password_confirmation && (
              <div className="invalid-feedback">
                {errors.password_confirmation}
              </div>
            )}
          </div>
        </div>
        <Link
          href={route('login')}
          className="link-blue-first mt-2 fw-semibold"
        >
          Lembrou sua senha?
        </Link>
        <button
          type="submit"
          className="btn btn-blue-first fw-bold mt-4"
          disabled={processing}
        >
          Entrar
        </button>
      </form>
    </UnAuthLayout>
  );
}
