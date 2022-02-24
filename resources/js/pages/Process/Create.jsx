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
    legal_forums: legalForums,
  } = usePage().props;

  const [wasTried, setWasTried] = useState(false);

  const { data, setData, errors, processing, post, reset } = useForm({
    clientId: '',
    title: '',
    code: '',
    legalInstanceId: '',
    judgment: '',
    legalCourtId: '',
    legalForumId: '',
    action: '',
    link: '',
    description: '',
    feeCause: '1',
    feeCondemnation: '1',
    feeAmount: '1',
    distributedIn: '',
    observationDescription: '',
    public: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('process.store'), {
      preserveScroll: true,
    });

    if (!wasTried) setWasTried(true);
  };

  const handleSetData = (key, newValue) => {
    setData(key, newValue);
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
                <li className="breadcrumb-item active">Adicionar processo</li>
              </ol>
            </div>
          </div>
          <div className="col-12">
            <h1 className="text-blue-first fw-bold fz-24 m-0">
              Adicionar processo
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
                <select
                  className={`form-control ${
                    errors.clientId
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }`.trim()}
                  value={data.clientId}
                  onChange={({ target: { value } }) =>
                    setData('clientId', value)
                  }
                  id="clientId"
                >
                  <option value="" disabled hidden>
                    Selecione
                  </option>
                  {clients
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
                  <label htmlFor="legalForumId" className="form-label">
                    Foro
                  </label>
                  <select
                    className={`form-control ${
                      errors.legalCourtId
                        ? 'is-invalid'
                        : (wasTried && !processing && 'is-valid') || ''
                    }`.trim()}
                    value={data.legalForumId}
                    onChange={({ target: { value } }) =>
                      setData('legalForumId', value)
                    }
                    id="legalForumId"
                  >
                    <option value="" disabled hidden>
                      Selecione
                    </option>
                    {legalForums
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
                  id="description"
                  name="description"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
