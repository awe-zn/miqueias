import { Link, useForm } from '@inertiajs/inertia-react';

import UnAuthLayout from '../../layout/UnAuth';

export default function ForgotPassword() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    post(route('password.email'));
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
