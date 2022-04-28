import { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Title } from '../auth/Title';
import { Input } from '../Input';
import { InputMask } from '../InputMask';

export default function Edit({
  showModalEdit,
  setShowModalEdit,
  itemFocusData,
}) {
  const { states } = usePage().props;

  const [wasTried, setWasTried] = useState(false);
  const [state, setState] = useState('');
  const [counties, setCounties] = useState([]);

  const {
    data,
    setData,
    put,
    errors,
    processing,
    reset,
    wasSuccessful,
    clearErrors,
  } = useForm({
    name: '',
    email: '',
    phoneNumber: '',
    zipCode: '',
    lineDescription: '',
    numberAddress: '',
    district: '',
    stateCode: '',
    countyId: '',
  });

  useEffect(() => {
    if (showModalEdit) {
      const {
        name,
        email,
        phone_number: phoneNumber,
        addres: {
          zip_code: zipCode,
          line_description: lineDescription,
          number_addres: numberAddress,
          district,
          county: {
            id: countyId,
            state: { code: stateCode },
          },
        },
      } = itemFocusData;

      setData({
        name,
        email,
        phoneNumber,
        zipCode: zipCode.replace(/\D/g, ''),
        lineDescription,
        numberAddress,
        district,
        stateCode,
        countyId: String(countyId),
      });
    }
  }, [showModalEdit]);

  useEffect(() => {
    if (wasSuccessful) {
      setTimeout(() => {
        setShowModalEdit(false);
        setWasTried(false);
        reset();
        clearErrors();
      }, 250);
    }
  }, [wasSuccessful]);

  useEffect(() => {
    if (showModalEdit) {
      if (data.stateCode !== state) {
        (async () => {
          const { data: countiesFetch } = await axios.get(
            route('county.show', data.stateCode)
          );

          setCounties([...countiesFetch]);
        })();

        setState(data.stateCode);
      }
    }
  }, [data, showModalEdit]);

  useEffect(() => {
    if (!showModalEdit) {
      reset();
      setWasTried(false);
      clearErrors();
    }
  }, [showModalEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('client.update', itemFocusData.id), {
      preserveScroll: true,
    });

    if (!wasTried) setWasTried(true);
  };

  const handleSetData = (key, newValue) => {
    setData(key, newValue);
  };

  const handleSetDataNumber = (key, value) => {
    const newNumberValue = value.replace(/\D/g, '');

    setData(key, newNumberValue);
  };

  return (
    <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
      <Modal.Body className="p-awe-32">
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row gapx-2 align-items-center mb-4">
            <Title label="Editar cliente" />
            <button
              type="button"
              className="border-0 bg-transparent d-flex p-0 ms-auto text-blue-first"
              onClick={() => setShowModalEdit(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="d-flex flex-column gap-4 mb-awe-64">
            <div>
              <Input
                type="text"
                name="name"
                label="Nome"
                value={data.name}
                handleSetValue={handleSetData}
                placeholder="Nome do cliente"
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
                placeholder="Email do cliente"
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
                placeholder="Telefone"
                status={
                  errors.phoneNumber
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <InputMask
                name="zipCode"
                label="CEP"
                value={data.zipCode}
                handleSetValue={handleSetDataNumber}
                mask="99 999-999"
                placeholder="CEP"
                status={
                  errors.zipCode
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <Input
                type="text"
                name="lineDescription"
                label="Endereço"
                value={data.lineDescription}
                handleSetValue={handleSetData}
                placeholder="Endereço"
                status={
                  errors.lineDescription
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <Input
                type="text"
                name="numberAddress"
                label="Número da residência"
                value={data.numberAddress}
                handleSetValue={handleSetData}
                placeholder="Número da residência"
                status={
                  errors.numberAddress
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <Input
                type="text"
                name="district"
                label="Bairro"
                value={data.district}
                handleSetValue={handleSetData}
                placeholder="Bairro"
                status={
                  errors.district
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <label htmlFor="stateCode" className="form-label">
                Estado
              </label>
              <select
                className={`form-control ${
                  errors.stateCode
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }`.trim()}
                value={data.stateCode}
                onChange={({ target: { value } }) =>
                  setData('stateCode', value)
                }
                id="stateCode"
              >
                <option value="" disabled hidden>
                  Selecione
                </option>
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
            <div>
              <label htmlFor="countyId" className="form-label">
                Cidade
              </label>
              <select
                className={`form-control ${
                  errors.countyId
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }`.trim()}
                value={data.countyId}
                onChange={({ target: { value } }) => setData('countyId', value)}
                id="countyId"
              >
                <option value="" disabled hidden>
                  Selecione
                </option>
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
          </div>
          <div className="mt-awe-32 d-flex flex-row gapx-3 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-blue-first fw-bold px-awe-40 border-2"
              onClick={() => setShowModalEdit(false)}
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
        </form>
      </Modal.Body>
    </Modal>
  );
}
Edit.propTypes = {
  showModalEdit: PropTypes.bool.isRequired,
  setShowModalEdit: PropTypes.func.isRequired,
  itemFocusData: PropTypes.shape().isRequired,
};
