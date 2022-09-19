import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Inertia } from '@inertiajs/inertia';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { FiFile } from 'react-icons/fi';

import { Title } from '../auth/Title';

export default function Create({ showModalCreate, setShowModalCreate }) {
  const [dragging, setDragging] = useState(false);

  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    maxSize: 2000000,
    multiple: false,
    accept: {
      pdf: ['application/pdf'],
    },
    onDropRejected() {
      toast.error('Por favor, insira um arquivo menor que 2MB.');
    },
    onDragEnter() {
      setDragging(true);
    },
    onDragLeave() {
      setDragging(false);
    },
    onDrop() {
      setDragging(false);
    },
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      Inertia.post(
        route('petition.store'),
        {
          file: acceptedFiles[0],
        },
        { forceFormData: true }
      );
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (acceptedFiles.length > 0 && showModalCreate) {
      setShowModalCreate(false);
    }
  }, [showModalCreate, acceptedFiles]);

  return (
    <Modal show={showModalCreate} onHide={() => setShowModalCreate(false)}>
      <Modal.Body className="p-awe-32">
        <div className="d-flex flex-row gapx-2 align-items-center mb-4">
          <Title label="Adicionar advogado" />
          <button
            type="button"
            className="border-0 bg-transparent d-flex p-0 ms-auto text-blue-first"
            onClick={() => setShowModalCreate(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="d-flex flex-column gapy-2">
          <div
            {...getRootProps({
              className: `cursor-pointer ${dragging ? 'dragging' : ''}`.trim(),
            })}
          >
            <input {...getInputProps()} />
            <div
              className={`py-4 text-center border border-2 border-gray-fifth rounded user-select-none transition ${
                !dragging ? 'border-dashed' : ''
              }`.trim()}
            >
              <FiFile className="text-blue-first" size={48} />
              <div className="d-flex flex-column align-items-center gapy-1 mt-4 text-gray-first fz-14">
                {dragging ? (
                  <>
                    <span>Solte aqui!</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                  </>
                ) : (
                  <>
                    <span>Arraste e solte aqui</span>
                    <span>ou</span>
                    <span className="fw-bold text-blue-first ">Busque</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-awe-32 d-flex flex-row gapx-3 justify-content-end">
          <button
            type="button"
            className="btn btn-outline-blue-first fw-bold px-awe-40 border-2"
            onClick={() => setShowModalCreate(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
Create.propTypes = {
  showModalCreate: PropTypes.bool.isRequired,
  setShowModalCreate: PropTypes.func.isRequired,
};
