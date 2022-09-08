import { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { formatISO } from 'date-fns';

import { Title } from '../auth/Title';
import { Input } from '../Input';

export default function EditEvent({
  showModalEditEvent,
  setShowModalEditEvent,
  itemFocusData,
}) {
  const { process } = usePage().props;

  const [wasTried, setWasTried] = useState(false);

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
    title: '',
    description: '',
    processId: '',
    startsIn: '',
    endsAt: '',
  });

  useEffect(() => {
    if (showModalEditEvent) {
      const {
        title,
        description,
        process_id: processId,
        starts_in: startsIn,
        ends_at: endsAt,
      } = itemFocusData;

      setData({
        title,
        description,
        processId,
        startsIn: formatISO(new Date(startsIn)).slice(0, 19),
        endsAt: formatISO(new Date(endsAt)).slice(0, 19),
      });
    }
  }, [showModalEditEvent]);

  useEffect(() => {
    if (wasSuccessful) {
      setTimeout(() => {
        setShowModalEditEvent(false);
        setWasTried(false);
        reset();
        clearErrors();
      }, 250);
    }
  }, [wasSuccessful]);

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('event.update', itemFocusData.id), {
      preserveScroll: true,
    });

    if (!wasTried) setWasTried(true);
  };

  const handleSetData = (key, newValue) => {
    setData(key, newValue);
  };

  return (
    <Modal
      show={showModalEditEvent}
      onHide={() => setShowModalEditEvent(false)}
    >
      <Modal.Body className="p-awe-32">
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row gapx-2 align-items-center mb-4">
            <Title label="Editar evento" />
            <button
              type="button"
              className="border-0 bg-transparent d-flex p-0 ms-auto text-blue-first"
              onClick={() => setShowModalEditEvent(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="d-flex flex-column gap-4 mb-awe-64">
            <div>
              <Input
                type="text"
                name="title"
                label="Título da evento"
                value={data.title}
                handleSetValue={handleSetData}
                placeholder="Título da evento"
                status={
                  errors.title
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <label htmlFor="description" className="form-label">
                Descrição da evento
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
                placeholder="Descrição"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="processId" className="form-label">
                Processo relacionado
              </label>
              <select
                className={`form-control ${
                  errors.processId
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }`.trim()}
                value={data.processId}
                onChange={({ target: { value } }) =>
                  setData('processId', value)
                }
                id="processId"
              >
                <option value="" disabled hidden>
                  Selecione
                </option>
                {process
                  .sort(({ title: a }, { title: b }) =>
                    a > b ? 1 : a < b ? -1 : 0
                  )
                  .map(({ title: titleProcess, id }) => (
                    <option value={id} key={id}>
                      {titleProcess}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <Input
                type="datetime-local"
                name="startsIn"
                label="De"
                value={data.startsIn}
                handleSetValue={handleSetData}
                status={
                  errors.startsIn
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <Input
                type="datetime-local"
                name="endsAt"
                label="Até"
                value={data.endsAt}
                handleSetValue={handleSetData}
                status={
                  errors.endsAt
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
          </div>
          <div className="mt-awe-32 d-flex flex-row gapx-3 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-blue-first fw-bold px-awe-40 border-2"
              onClick={() => setShowModalEditEvent(false)}
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
EditEvent.propTypes = {
  showModalEditEvent: PropTypes.bool.isRequired,
  setShowModalEditEvent: PropTypes.func.isRequired,
  itemFocusData: PropTypes.shape().isRequired,
};
