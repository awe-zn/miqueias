import { useForm } from '@inertiajs/inertia-react';

import UnAuthLayout from '../../layout/UnAuth';

export default function Login() {
  const { data, setData, put, processing, errors } = useForm({
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    put(route('renew-password'));
  };

  return (
    <UnAuthLayout>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <div className="d-flex flex-column gapy-4">
          <h1 className="text-blue-first fw-bold fz-24 m-0">
            Defina uma nova senha
          </h1>
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
          <div>
            <label htmlFor="email" className="form-label">
              Confirme
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.password_confirmation ? 'is-invalid' : ''
              }`.trim()}
              id="password_confirmation"
              placeholder="Confirme sua senha"
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
        <button
          type="submit"
          className="btn btn-blue-first fw-bold mt-4"
          disabled={processing}
        >
          Atualizar senha
        </button>
      </form>
    </UnAuthLayout>
  );
}
