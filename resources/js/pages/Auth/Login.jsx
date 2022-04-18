import { Link, useForm } from '@inertiajs/inertia-react';

import UnAuthLayout from '../../layout/UnAuth';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    post(route('login'));
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
              onChange={({ target: { value } }) => setData('password', value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
        </div>
        <Link
          href={route('password.request')}
          className="link-blue-first mt-2 fw-semibold"
        >
          Esqueceu sua senha?
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
