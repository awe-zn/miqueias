import { Modal } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import localePtBr from 'date-fns/locale/pt-BR';

import { Link } from '@inertiajs/inertia-react';
import { Title } from '../auth/Title';

export default function ShowEvent({
  showModalViewEvent,
  setShowModalViewEvent,
  itemFocusData,
  openEditEvent,
  showActionArea,
}) {
  return (
    <Modal
      show={showModalViewEvent}
      onHide={() => setShowModalViewEvent(false)}
    >
      <Modal.Body className="p-awe-32">
        <div className="d-flex flex-column gapy-4">
          <div className="d-flex flex-row gapx-2 align-items-center">
            <Title label="Evento" />
            <button
              type="button"
              className="border-0 bg-transparent d-flex p-0 ms-auto text-blue-first"
              onClick={() => setShowModalViewEvent(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          {showModalViewEvent && (
            <>
              <strong className="text-gray-first">{itemFocusData.title}</strong>
              <div className="d-flex flex-column gapy-2">
                <span className="text-gray-second">
                  Descrição:{' '}
                  <span className="text-gray-first">
                    {itemFocusData.description}
                  </span>
                </span>
                <div className="d-flex flex-column gapy-1">
                  <span className="text-gray-second">
                    De:{' '}
                    <strong className="text-brand-first">
                      {format(
                        new Date(itemFocusData.starts_in),
                        'eeeeee, dd/MM/yyyy HH:mm',
                        {
                          locale: localePtBr,
                        }
                      )}
                    </strong>
                  </span>
                  <span className="text-gray-second">
                    Até:{' '}
                    <strong className="text-brand-first">
                      {format(
                        new Date(itemFocusData.ends_at),
                        'eeeeee, dd/MM/yyyy HH:mm',
                        {
                          locale: localePtBr,
                        }
                      )}
                    </strong>
                  </span>
                </div>
                <span className="text-gray-second">
                  Processo:{' '}
                  <span className="text-gray-first">
                    {itemFocusData.process.title}
                  </span>
                </span>
              </div>
              {showActionArea && (
                <div className="d-flex flex-row gapx-awe-32">
                  <button
                    type="button"
                    className="border-0 link-gray-first fw-semibold fz-16 d-flex flex-row gapx-2 p-0 bg-white transition"
                    onClick={() => {
                      setShowModalViewEvent(false);
                      openEditEvent();
                    }}
                  >
                    <FaEdit size={24} /> <span>Editar</span>
                  </button>
                  <Link
                    type="button"
                    className="border-0 link-gray-first fw-semibold fz-16 d-flex flex-row gapx-2 p-0 bg-white transition"
                    as="button"
                    method="delete"
                    href={route('event.delete', itemFocusData.id)}
                    onClick={() => setShowModalViewEvent(false)}
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
ShowEvent.propTypes = {
  showModalViewEvent: PropTypes.bool.isRequired,
  setShowModalViewEvent: PropTypes.func.isRequired,
  itemFocusData: PropTypes.shape().isRequired,
  openEditEvent: PropTypes.func,
  showActionArea: PropTypes.bool,
};
ShowEvent.defaultProps = {
  showActionArea: true,
  openEditEvent: () => {},
};
