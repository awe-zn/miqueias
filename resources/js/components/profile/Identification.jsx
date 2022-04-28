import { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import axios from 'axios';

import imageHelper from '../../helper/image';
import user from '../../../images/user.svg';

import { Input } from '../Input';
import { InputMask } from '../InputMask';

export const Identification = () => {
  const {
    appEnvironment,
    user: { name, email, phone_number: phoneNumber },
    addres: {
      zip_code: zipCode,
      line_description: lineDescription,
      number_addres: numberAddres,
      district,
      county: {
        id: countyId,
        state: { code: stateCode },
      },
    },
    states,
  } = usePage().props;

  const [wasTried, setWasTried] = useState(false);
  const [state, setState] = useState(stateCode);
  const [counties, setCounties] = useState([]);

  const { setData, data, errors, processing, put, reset } = useForm({
    name,
    email,
    phoneNumber,
    zipCode,
    lineDescription,
    numberAddres,
    district,
    countyId,
    stateCode,
  });

  useEffect(() => {
    if (data.stateCode !== state) {
      (async () => {
        const { data: countiesFetch } = await axios.get(
          route('county.show', data.stateCode)
        );

        setCounties([...countiesFetch]);
      })();

      setState(data.stateCode);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      const { data: countiesFetch } = await axios.get(
        route('county.show', stateCode)
      );

      setCounties([...countiesFetch]);
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('profile.identification'), {
      preserveScroll: true,
    });

    if (!wasTried) setWasTried(true);
  };

  const handleSetData = (key, newValue) => {
    setData(key, newValue);
  };
  return (
    <section>
      <form className="row gapy-awe-32" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="d-flex flex-column gapy-awe-32">
            <div className="d-flex flex-column">
              <label className="form-label">Foto do perfil</label>
              <img
                src={imageHelper({
                  appEnvironment,
                  path: user,
                })}
                alt={data.name}
                className="img-fluid rounded-circle object-cover img-user bg-brand-first"
              />
            </div>
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
              <InputMask
                name="phoneNumber"
                label="Telefone"
                value={data.phoneNumber}
                handleSetValue={handleSetData}
                mask="(99) 9999-9999"
                status={
                  errors.phoneNumber
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column gapy-awe-32">
            <div>
              <InputMask
                name="zipCode"
                label="CEP"
                value={data.zipCode}
                handleSetValue={handleSetData}
                mask="99999-999"
                status={
                  errors.zipCode
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div className="d-flex flex-column flex-sm-row gap-awe-32">
              <div className="flex-5">
                <Input
                  type="text"
                  name="lineDescription"
                  label="Rua"
                  value={data.lineDescription}
                  handleSetValue={handleSetData}
                  status={
                    errors.lineDescription
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }
                />
              </div>
              <div className="flex-3">
                <Input
                  type="text"
                  name="numberAddres"
                  label="Número"
                  value={data.numberAddres}
                  handleSetValue={handleSetData}
                  status={
                    errors.numberAddres
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }
                />
              </div>
            </div>
            <div>
              <Input
                name="district"
                label="Bairro"
                value={data.district}
                handleSetValue={handleSetData}
                type="text"
                status={
                  errors.district
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div className="d-flex flex-column flex-sm-row gap-awe-32">
              <div className="flex-5">
                <label htmlFor="countyId" className="form-label">
                  Cidade
                </label>
                <select
                  className="form-select"
                  value={data.countyId}
                  onChange={({ target: { value } }) =>
                    setData('countyId', value)
                  }
                >
                  {counties
                    .sort(({ name: a }, { name: b }) =>
                      a > b ? 1 : a < b ? -1 : 0
                    )
                    .map(({ name: nameCounty, id }) => (
                      <option value={id} key={id}>
                        {nameCounty}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex-3">
                <label htmlFor="stateCode" className="form-label">
                  UF da OAB
                </label>
                <select
                  className="form-select"
                  value={data.stateCode}
                  onChange={({ target: { value } }) =>
                    setData('stateCode', value)
                  }
                >
                  {states
                    .sort(({ name: a }, { name: b }) =>
                      a > b ? 1 : a < b ? -1 : 0
                    )
                    .map(({ name: nameCounty, code }) => (
                      <option value={code} key={code}>
                        {nameCounty}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
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
