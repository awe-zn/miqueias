import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { FaRegFolder } from 'react-icons/fa';
import { IMaskInput } from 'react-imask';

import { AuthLayout } from '../../layout/Auth';
import { Input } from '../../components/Input';

export default function Process() {
  const {
    clients,
    legal_instances: legalInstances,
    legal_courts: legalCourts,
    process: {
      id: processId,
      clients: clientsIdFetched,
      title,
      code,
      legal_instance_id: legalInstanceId,
      judgment,
      legal_court_id: legalCourtId,
      legal_forum: legalForum,
      action,
      link,
      description,
      fee_cause: feeCause,
      fee_condemnation: feeCondemnation,
      fee_amount: feeAmount,
      distributed_in: distributedIn,
      observation_description: observationDescription,
      public: isPublic,
    },
  } = usePage().props;

  const [wasTried, setWasTried] = useState(false);
  const [clientsAmount, setClientsAmount] = useState(clientsIdFetched.length);

  const clientsId = clientsIdFetched.map(({ id }) => String(id));

  const { data, setData, errors, processing, put, reset } = useForm({
    clientsId,
    title,
    code,
    legalInstanceId,
    judgment,
    legalCourtId,
    legalForum,
    action,
    link,
    description,
    feeCause: String(feeCause),
    feeCondemnation: String(feeCondemnation),
    feeAmount: String(feeAmount),
    distributedIn,
    observationDescription,
    public: isPublic,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('process.update', processId), {
      preserveScroll: true,
    });

    if (!wasTried) setWasTried(true);
  };

  const handleSetData = (key, newValue) => {
    setData(key, newValue);
  };

  const handleNewClient = () => {
    setClientsAmount(clientsAmount + 1);

    const newClients = [...data.clientsId, ''];
    setData('clientsId', newClients);
  };

  const handleChangeClient = (index, idClient) => {
    const newClients = [...data.clientsId];
    newClients[index] = idClient;
    setData('clientsId', newClients);
  };

  return (
    <AuthLayout>
      <div className="container">
        <div className="row gapy-4">
          <div className="col-12">
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <FaRegFolder className="me-2" />
                  Processos
                </li>
                <li className="breadcrumb-item active">Editar processo</li>
              </ol>
            </div>
          </div>
          <div className="col-12">
            <h1 className="text-blue-first fw-bold fz-24 m-0">
              Editar processo
            </h1>
          </div>
          <div className="col-md-10 col-lg-8">
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column gapy-awe-32 pt-2"
            >
              <div>
                <label htmlFor="clientId" className="form-label">
                  Cliente
                </label>

                <div className="d-flex flex-column gapy-2">
                  {Array.from(Array(clientsAmount), (_, index) => (
                    <select
                      className={`form-control ${
                        errors.clientId
                          ? 'is-invalid'
                          : (wasTried && !processing && 'is-valid') || ''
                      }`.trim()}
                      value={data.clientsId[index]}
                      onChange={({ target: { value } }) =>
                        handleChangeClient(index, value)
                      }
                      id="clientId"
                      key={index}
                    >
                      <option value="" disabled hidden>
                        Selecione
                      </option>
                      {clients
                        .filter((item) => item !== undefined)
                        .sort(({ name: a }, { name: b }) =>
                          a > b ? 1 : a < b ? -1 : 0
                        )
                        .map(({ name: nameCounty, id }) => {
                          const clientIndex = data.clientsId.findIndex(
                            (idClient) => idClient === String(id)
                          );
                          const isDisabled =
                            clientIndex >= 0 && clientIndex !== index;

                          return (
                            <option value={id} key={id} disabled={isDisabled}>
                              {nameCounty}
                            </option>
                          );
                        })}
                    </select>
                  ))}
                </div>

                {clientsAmount < clients.length && (
                  <button
                    className="mt-1 border-0 bg-transparent text-brand-first"
                    type="button"
                    onClick={handleNewClient}
                    disabled={clientsAmount >= clients.length}
                  >
                    Adicionar cliente
                  </button>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="title"
                  label="Título do processo"
                  value={data.title}
                  handleSetValue={handleSetData}
                  status={
                    errors.title
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }
                  placeholder="Título do processo"
                />
              </div>
              <div className="d-flex flex-column flex-sm-row gap-awe-32">
                <div className="flex-7">
                  <Input
                    type="number"
                    name="code"
                    label="Número"
                    value={data.code}
                    handleSetValue={handleSetData}
                    status={
                      errors.code
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }
                    placeholder="Número do processo"
                  />
                </div>
                <div className="flex-sm-4 flex-md-3">
                  <label htmlFor="legalInstanceId" className="form-label">
                    Instância
                  </label>
                  <select
                    className={`form-control ${
                      errors.legalInstanceId
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }`.trim()}
                    value={data.legalInstanceId}
                    onChange={({ target: { value } }) =>
                      setData('legalInstanceId', value)
                    }
                    id="legalInstanceId"
                  >
                    <option value="" disabled hidden>
                      Selecione
                    </option>
                    {legalInstances
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
              <div className="d-flex flex-column flex-md-row gap-awe-32">
                <div className="flex-1">
                  <Input
                    type="text"
                    name="judgment"
                    label="Juízo"
                    value={data.judgment}
                    handleSetValue={handleSetData}
                    status={
                      errors.judgment
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }
                    placeholder="Juízo"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="legalCourtId" className="form-label">
                    Vara
                  </label>
                  <select
                    className={`form-control ${
                      errors.legalCourtId
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }`.trim()}
                    value={data.legalCourtId}
                    onChange={({ target: { value } }) =>
                      setData('legalCourtId', value)
                    }
                    id="legalCourtId"
                  >
                    <option value="" disabled hidden>
                      Selecione
                    </option>
                    {legalCourts
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
                <div className="flex-1">
                  <Input
                    type="text"
                    name="legalForum"
                    label="Foro"
                    value={data.legalForum}
                    handleSetValue={handleSetData}
                    status={
                      errors.legalForum
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }
                    placeholder="Foro"
                  />
                </div>
              </div>
              <div>
                <Input
                  type="text"
                  name="action"
                  label="Ação"
                  value={data.action}
                  handleSetValue={handleSetData}
                  status={
                    errors.action
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }
                  placeholder="Digite a ação"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="link"
                  label="Link no tribunal"
                  value={data.link}
                  handleSetValue={handleSetData}
                  status={
                    errors.link
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }
                  placeholder="Link"
                />
              </div>
              <div>
                <label htmlFor="description" className="form-label">
                  Objeto
                </label>
                <textarea
                  id="link"
                  name="link"
                  className={`form-control ${
                    errors.description
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }`.trim()}
                  value={data.description}
                  onChange={({ target: { value } }) =>
                    setData('description', value)
                  }
                  placeholder="Digite a descrição do processo"
                  rows={3}
                />
              </div>
              <div className="d-flex flex-column flex-md-row gap-awe-32">
                <div className="flex-1">
                  <label htmlFor="feeCause" className="form-label">
                    Valor da causa
                  </label>
                  <IMaskInput
                    id="feeCause"
                    name="feeCause"
                    className={`form-control ${
                      errors.feeCause
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }`}
                    mask="R$ num"
                    unmask
                    blocks={{
                      num: {
                        mask: Number,
                        thousandsSeparator: '.',
                      },
                    }}
                    onAccept={(value) => {
                      setData('feeCause', value);
                    }}
                    value={data.feeCause}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="date"
                    name="distributedIn"
                    label="Distribuído em"
                    value={data.distributedIn}
                    handleSetValue={handleSetData}
                    status={
                      errors.distributedIn
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }
                  />
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row gap-awe-32">
                <div className="flex-1">
                  <label htmlFor="feeCondemnation" className="form-label">
                    Valor da condenação
                  </label>
                  <IMaskInput
                    id="feeCondemnation"
                    name="feeCondemnation"
                    className={`form-control ${
                      errors.feeCondemnation
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }`}
                    mask="R$ num"
                    unmask
                    blocks={{
                      num: {
                        mask: Number,
                        thousandsSeparator: '.',
                      },
                    }}
                    onAccept={(value) => {
                      setData('feeCondemnation', value);
                    }}
                    value={data.feeCondemnation}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="feeAmount" className="form-label">
                    Valor do honorário
                  </label>
                  <IMaskInput
                    id="feeAmount"
                    name="feeAmount"
                    className={`form-control ${
                      errors.feeAmount
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }`}
                    mask="R$ num"
                    unmask
                    blocks={{
                      num: {
                        mask: Number,
                        thousandsSeparator: '.',
                      },
                    }}
                    onAccept={(value) => {
                      setData('feeAmount', value);
                    }}
                    value={data.feeAmount}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="observationDescription" className="form-label">
                  Observações
                </label>
                <textarea
                  id="link"
                  name="link"
                  className={`form-control ${
                    errors.observationDescription
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }`.trim()}
                  value={data.observationDescription}
                  onChange={({ target: { value } }) =>
                    setData('observationDescription', value)
                  }
                  placeholder="Digite mais detalhes"
                  rows={3}
                />
              </div>
              <div>
                <span className="form-label">Acesso</span>
                <div className="d-flex flex-column gapy-3 mt-2">
                  <div className="form-check calendar">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="public"
                      id="public-true"
                      onClick={() => setData('public', true)}
                      checked={data.public}
                      readOnly
                    />
                    <label className="form-check-label" htmlFor="public-true">
                      Público
                    </label>
                  </div>
                  <div className="form-check calendar">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="public"
                      id="public-false"
                      onClick={() => setData('public', false)}
                      checked={!data.public}
                      readOnly
                    />
                    <label className="form-check-label" htmlFor="public-false">
                      Privado
                    </label>
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
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
