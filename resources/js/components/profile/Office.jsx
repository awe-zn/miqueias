import { useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { useForm, usePage } from '@inertiajs/inertia-react';

import { Input } from '../Input';

const mask = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
};

export const Office = () => {
  const {
    office: {
      name,
      email,
      ccm,
      identification_document: identificationDocument,
      oab,
      state_oab: stateOab,
    },
    states,
  } = usePage().props;

  const [wasTried, setWasTried] = useState(false);
  const [format, setFormat] = useState(
    identificationDocument.length === 11 ? 'cpf' : 'cnpj'
  );

  const { setData, data, errors, processing, put, reset } = useForm({
    name,
    email,
    ccm,
    identificationDocument,
    oab,
    stateOab: String(stateOab),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('profile.office'), {
      preserveScroll: true,
    });

    if (!wasTried) setWasTried(true);
  };

  const handleSetData = (key, newValue) => {
    setData(key, newValue);
  };
  const handleSetCpf = ({ target }) => {
    const { value } = target;

    const valueUnmask = value.replaceAll(/\D/g, '');

    if (valueUnmask.length > 11) {
      setFormat('cnpj');
    } else {
      setFormat('cpf');
    }

    if (valueUnmask.length < 15) {
      setData('identificationDocument', valueUnmask);
    }
  };
  return (
    <section>
      <form className="row gapy-awe-32" onSubmit={handleSubmit}>
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="d-flex flex-column gapy-awe-32">
            <div>
              <Input
                type="text"
                name="name"
                label="Nome"
                value={data.name}
                handleSetValue={handleSetData}
                status={
                  errors.name
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                label="E-mail"
                value={data.email}
                handleSetValue={handleSetData}
                status={
                  errors.email
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <label htmlFor="identificationDocument" className="form-label">
                CPF/CNPJ
              </label>
              <ReactInputMask
                id="identificationDocument"
                name="identificationDocument"
                className="form-control"
                value={data.identificationDocument}
                onChangeCapture={handleSetCpf}
                mask={format === 'cpf' ? mask.cpf : mask.cnpj}
                type="text"
              />
            </div>
            <div>
              <Input
                type="text"
                name="ccm"
                label="CCM"
                value={data.ccm}
                handleSetValue={handleSetData}
                status={
                  errors.ccm
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div className="d-flex flex-column flex-sm-row gap-awe-32">
              <div className="flex-5">
                <Input
                  type="text"
                  name="oab"
                  label="OAB"
                  value={data.oab}
                  handleSetValue={handleSetData}
                  status={
                    errors.oab
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }
                />
              </div>
              <div className="flex-3">
                <label htmlFor="stateOab" className="form-label">
                  UF da OAB
                </label>
                <select
                  className="form-select"
                  value={data.stateOab}
                  onChange={({ target: { value } }) =>
                    setData('stateOab', value)
                  }
                >
                  {states
                    .sort(({ initials: a }, { initials: b }) =>
                      a > b ? 1 : a < b ? -1 : 0
                    )
                    .map(({ initials, id }) => (
                      <option value={id} key={id}>
                        {initials}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-awe-32 d-flex flex-row gapx-3 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-blue-first fw-bold px-awe-40 border-2"
              onClick={() => reset()}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-blue-first fw-bold px-awe-40 border-2"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
