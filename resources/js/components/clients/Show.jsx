import { Modal } from 'react-bootstrap';
import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { Title } from '../auth/Title';

export default function Show({
  showModalView,
  setShowModalView,
  itemFocusData,
  openEditClient,
  showActionArea,
}) {
  return (
    <Modal show={showModalView} onHide={() => setShowModalView(false)}>
      <Modal.Body className="p-awe-32">
        <div className="d-flex flex-column gapy-4">
          <div className="d-flex flex-row gapx-2 align-items-center">
            <Title label="Cliente" />
            <button
              type="button"
              className="border-0 bg-transparent d-flex p-0 ms-auto text-blue-first"
              onClick={() => setShowModalView(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          {showModalView && (
            <>
              <strong className="text-gray-first">{itemFocusData.name}</strong>
              <div className="d-flex flex-column gapy-2">
                <span className="text-gray-second">
                  E-mail:{' '}
                  <span className="text-gray-first">{itemFocusData.email}</span>
                </span>
                <span className="text-gray-second">
                  Número de telefone:{' '}
                  <span className="text-gray-first">
                    {itemFocusData.phone_number}
                  </span>
                </span>
                <div className="d-flex flex-column gapy-1">
                  <span className="text-gray-second">
                    Endereço:{' '}
                    <span className="text-gray-first">
                      {itemFocusData.addres.line_description}
                    </span>
                  </span>
                  <span className="text-gray-second">
                    CEP:{' '}
                    <span className="text-gray-first">
                      {itemFocusData.addres.zip_code}
                    </span>
                  </span>
                  <span className="text-gray-second">
                    Número:{' '}
                    <span className="text-gray-first">
                      {itemFocusData.addres.number_addres}
                    </span>
                  </span>
                  <span className="text-gray-second">
                    Bairro:{' '}
                    <span className="text-gray-first">
                      {itemFocusData.addres.district}
                    </span>
                  </span>
                  <span className="text-gray-second">
                    Cidade/UF:{' '}
                    <span className="text-gray-first">
                      {itemFocusData.addres.county.name}/
                      {itemFocusData.addres.county.state.initials}
                    </span>
                  </span>
                </div>
              </div>
              {showActionArea && (
                <div className="d-flex flex-row gapx-awe-32">
                  <button
                    type="button"
                    className="border-0 link-gray-first fw-semibold fz-16 d-flex flex-row gapx-2 p-0 bg-white transition"
                    onClick={() => {
                      setShowModalView(false);
                      openEditClient();
                    }}
                  >
                    <FaEdit size={24} /> <span>Editar</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
Show.propTypes = {
  showModalView: PropTypes.bool.isRequired,
  setShowModalView: PropTypes.func.isRequired,
  itemFocusData: PropTypes.shape().isRequired,
  openEditClient: PropTypes.func,
  showActionArea: PropTypes.bool,
};
Show.defaultProps = {
  showActionArea: true,
  openEditClient: () => {},
};
