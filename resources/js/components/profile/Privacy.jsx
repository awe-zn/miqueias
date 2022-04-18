import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { toast } from 'react-toastify';

import { Input } from '../Input';

export const Privacy = () => {
  const [wasTried, setWasTried] = useState(false);

  const { data, setData, put, errors, processing, wasSuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleSetData = (key, newValue) => {
    setData(key, newValue);
  };

  useEffect(() => {
    if (wasSuccessful) {
      toast.success('Senha alterada com sucesso');

      setTimeout(() => {
        Inertia.replace(route('home'));
      }, 300);
    }
  }, [wasSuccessful]);

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('user-password.update'), {
      preserveScroll: true,
    });

    if (!wasTried) setWasTried(true);
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="d-flex flex-column gapy-awe-32">
        <div className="row">
          <div className="col-md-6">
            <Input
              type="password"
              name="current_password"
              label="Senha atual"
              value={data.current_password}
              handleSetValue={handleSetData}
              status={
                errors.updatePassword?.current_password
                  ? 'is-invalid'
                  : (wasTried && !processing && 'is-valid') || ''
              }
            />
          </div>
        </div>
        <div className="row gapy-3">
          <div className="col-md-6">
            <Input
              type="password"
              name="password"
              label="Nova senha"
              value={data.password}
              handleSetValue={handleSetData}
              status={
                errors.updatePassword?.password
                  ? 'is-invalid'
                  : (wasTried && !processing && 'is-valid') || ''
              }
            />
          </div>
          <div className="col-md-6">
            <Input
              type="password"
              name="password_confirmation"
              label="Confirmar nova senha"
              value={data.password_confirmation}
              handleSetValue={handleSetData}
              status={
                errors.updatePassword?.password_confirmation
                  ? 'is-invalid'
                  : (wasTried && !processing && 'is-valid') || ''
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-auto ms-auto">
            <button
              className="btn btn-blue-first fw-bold px-awe-40 border-2"
              type="submit"
            >
              Alterar senha
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
