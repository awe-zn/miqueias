import { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { Title } from '../auth/Title';
import { Input } from '../Input';

export default function CreateTask({
  showModalCreateTask,
  setShowModalCreateTask,
}) {
  const { process, task_priority: taskPriority } = usePage().props;

  const [wasTried, setWasTried] = useState(false);

  const {
    data,
    setData,
    post,
    errors,
    processing,
    reset,
    clearErrors,
    wasSuccessful,
  } = useForm({
    title: '',
    description: '',
    processId: '',
    date: '',
    priorityId: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setShowModalCreateTask(false);
      setWasTried(false);
      reset();
      clearErrors();
    }, 250);
  }, [wasSuccessful]);

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('task.store'), {
      preserveScroll: true,
    });

    if (!wasTried) setWasTried(true);
  };

  const handleSetData = (key, newValue) => {
    setData(key, newValue);
  };

  return (
    <Modal
      show={showModalCreateTask}
      onHide={() => setShowModalCreateTask(false)}
    >
      <Modal.Body className="p-awe-32">
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row gapx-2 align-items-center mb-4">
            <Title label="Adicionar tarefa" />
            <button
              type="button"
              className="border-0 bg-transparent d-flex p-0 ms-auto text-blue-first"
              onClick={() => setShowModalCreateTask(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="d-flex flex-column gap-4 mb-awe-64">
            <div>
              <Input
                type="text"
                name="title"
                label="Título da tarefa"
                value={data.title}
                handleSetValue={handleSetData}
                placeholder="Título da tarefa"
                status={
                  errors.title
                    ? 'is-invalid'
                    : (wasTried && !processing && 'is-valid') || ''
                }
              />
            </div>
            <div>
              <label htmlFor="description" className="form-label">
                Descrição da tarefa
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
            <div className="d-flex flex-row gap-awe-32">
              <div className="flex-1">
                <Input
                  type="date"
                  name="date"
                  label="Data"
                  value={data.date}
                  handleSetValue={handleSetData}
                  status={
                    errors.date
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }
                />
              </div>
              <div className="flex-1">
                <label htmlFor="priorityId" className="form-label">
                  Prioridade
                </label>
                <select
                  className={`form-control ${
                    errors.priorityId
                      ? 'is-invalid'
                      : (wasTried && !processing && 'is-valid') || ''
                  }`.trim()}
                  value={data.priorityId}
                  onChange={({ target: { value } }) =>
                    setData('priorityId', value)
                  }
                  id="priorityId"
                >
                  <option value="" disabled hidden>
                    Selecione
                  </option>
                  {taskPriority
                    .sort(({ description: a }, { description: b }) =>
                      a > b ? 1 : a < b ? -1 : 0
                    )
                    .map(({ description, id }) => (
                      <option value={id} key={id}>
                        {description}
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
              onClick={() => setShowModalCreateTask(false)}
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
CreateTask.propTypes = {
  showModalCreateTask: PropTypes.bool.isRequired,
  setShowModalCreateTask: PropTypes.func.isRequired,
};
