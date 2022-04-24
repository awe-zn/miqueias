import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { format, addHours } from 'date-fns';
import localePtBr from 'date-fns/locale/pt-BR';
import { Link, useForm } from '@inertiajs/inertia-react';

import { Title } from '../auth/Title';

export default function ShowTask({
  showModalViewTask,
  setShowModalViewTask,
  itemFocusData,
  openEditTask,
  showActionArea,
}) {
  const [concluded, setConcluded] = useState(false);

  const { processing, put } = useForm();

  useEffect(() => {
    if (Object.keys(itemFocusData).length > 0) {
      setConcluded(itemFocusData.concluded);
    }
  }, [showModalViewTask]);

  const handleConclusionTask = ({ target: { checked } }) => {
    setConcluded(checked);

    put(route('task.conclude', itemFocusData.id));
  };

  return (
    <Modal show={showModalViewTask} onHide={() => setShowModalViewTask(false)}>
      <Modal.Body className="p-awe-32">
        <div className="d-flex flex-column gapy-4">
          <div className="d-flex flex-row gapx-2 align-items-center">
            <Title label="Tarefa" />
            <button
              type="button"
              className="border-0 bg-transparent d-flex p-0 ms-auto text-blue-first"
              onClick={() => setShowModalViewTask(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          {showModalViewTask && (
            <>
              <strong className="text-gray-first">{itemFocusData.title}</strong>
              <div className="d-flex flex-column gapy-2">
                <span className="text-gray-second">
                  Descrição:{' '}
                  <span className="text-gray-first">
                    {itemFocusData.description}
                  </span>
                </span>
                <span className="text-gray-second">
                  De:{' '}
                  <strong className="text-brand-first">
                    {format(
                      addHours(new Date(itemFocusData.schedule_at), 3),
                      'eeeeee, dd/MM/yyyy',
                      {
                        locale: localePtBr,
                      }
                    )}
                  </strong>
                </span>
                <span className="text-gray-second">
                  Prioridade:{' '}
                  <span className="text-gray-first">
                    {itemFocusData.task_priority.description}
                  </span>
                </span>
                <span className="text-gray-second">
                  Processo:{' '}
                  <span className="text-gray-first">
                    {itemFocusData.process.title}
                  </span>
                </span>
                <div className="form-check calendar mt-awe-32 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="concluded"
                    disabled={processing}
                    onChange={handleConclusionTask}
                    checked={concluded}
                  />
                  <label className="form-check-label" htmlFor="concluded">
                    Marcar como concluída
                  </label>
                </div>
              </div>
              {showActionArea && (
                <div className="d-flex flex-row gapx-awe-32">
                  <button
                    type="button"
                    className="border-0 link-gray-first fw-semibold fz-16 d-flex flex-row gapx-2 p-0 bg-white transition"
                    onClick={() => {
                      setShowModalViewTask(false);
                      openEditTask();
                    }}
                  >
                    <FaEdit size={24} /> <span>Editar</span>
                  </button>
                  <Link
                    type="button"
                    className="border-0 link-gray-first fw-semibold fz-16 d-flex flex-row gapx-2 p-0 bg-white transition"
                    as="button"
                    method="delete"
                    href={route('task.delete', itemFocusData.id)}
                    onClick={() => setShowModalViewTask(false)}
                  >
                    <FaTrash size={24} /> <span>Excluir</span>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
ShowTask.propTypes = {
  showModalViewTask: PropTypes.bool.isRequired,
  setShowModalViewTask: PropTypes.func.isRequired,
  itemFocusData: PropTypes.shape().isRequired,
  openEditTask: PropTypes.func,
  showActionArea: PropTypes.bool,
};
ShowTask.defaultProps = {
  showActionArea: true,
  openEditTask: () => {},
};
