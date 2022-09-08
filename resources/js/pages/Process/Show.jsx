import { useEffect, useState } from 'react';
import { usePage, Link, useForm } from '@inertiajs/inertia-react';
import { FaChevronDown, FaDownload, FaRegFolder } from 'react-icons/fa';
import { format } from 'date-fns';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { FiFile } from 'react-icons/fi';
import { Inertia } from '@inertiajs/inertia';
import { Dropdown } from 'react-bootstrap';

import { AuthLayout } from '../../layout/Auth';

import ShowTask from '../../components/calendar/ShowTask';
import ShowEvent from '../../components/calendar/ShowEvent';

export default function Show() {
  const { process, id } = usePage().props;
  const {
    clients,
    legal_instance: legalInstance,
    legal_court: legalCourt,
    legal_forum: legalForum,
    tasks,
    events,
    files,
    concluded,
  } = process;

  const { processing, put, delete: deleteRequest } = useForm();

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskModalData, setTaskModalData] = useState({});
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventModalData, setEventModalData] = useState({});
  const [dragging, setDragging] = useState(false);

  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    maxSize: 2000000,
    multiple: false,
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
    if (!taskModalOpen) setTaskModalData({});
  }, [taskModalOpen]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      Inertia.post(
        route('process.files.store', id),
        {
          file: acceptedFiles[0],
        },
        { forceFormData: true }
      );
    }
  }, [acceptedFiles]);

  const handleConclusionProcess = () => {
    put(route('process.conclude', id));
  };

  const handleDeleteProcess = () => {
    deleteRequest(route('process.destroy', id));
  };

  return (
    <>
      <AuthLayout>
        <section>
          <div className="container">
            <div className="row gapy-4 mb-4">
              <div className="col-12">
                <div>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <FaRegFolder className="me-2" />
                      Processos
                    </li>
                    <li className="breadcrumb-item active">{process.title}</li>
                  </ol>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex flex-row align-items-center">
                  <h1 className="text-blue-first fw-bold fz-24 m-0">
                    {process.title}
                  </h1>
                  <Dropdown align="end" className="ms-auto">
                    <Dropdown.Toggle
                      className="btn btn-outline-blue-first fw-bold fz-14 px-e-2 d-flex flex-row gapx-3 align-items-center"
                      disabled={processing}
                    >
                      Ações <FaChevronDown />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-calendar">
                      <Link
                        as="button"
                        href={route('process.edit', id)}
                        type="button"
                        className="dropdown-item"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={handleConclusionProcess}
                      >
                        {!concluded ? 'Encerrar' : 'Reabrir'}
                      </button>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={handleDeleteProcess}
                      >
                        Excluir
                      </button>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gapy-5">
              <div className="col">
                <div>
                  <h4 className="fz-16 text-gray-first fw-bold mb-4">
                    Dados do processo
                  </h4>
                  <div className="d-flex flex-column gapy-5 text-gray-second">
                    <div className="d-flex flex-column gapy-awe-12">
                      <span>
                        Processo:{' '}
                        <span className="text-gray-first">{process.title}</span>
                      </span>
                      <div>
                        <span>Cliente{clients.length > 1 ? 's' : ''}: </span>
                        <div className="d-flex flex-column gapy-1">
                          {clients.map(({ id: clientId, name }) => (
                            <span
                              className="text-brand-first fw-bold"
                              key={`client.${clientId}`}
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span>
                        Status:{' '}
                        <span className="text-gray-first">
                          {process.concluded ? 'Concluído' : 'Em andamento'}
                        </span>
                      </span>
                      <span>
                        Atendimento:{' '}
                        <a
                          href="#"
                          target="_blank"
                          className="text-brand-first"
                          rel="noreferrer"
                        >
                          Link atendimento
                        </a>
                      </span>
                    </div>
                    <div className="d-flex flex-column gapy-awe-12">
                      <span>
                        Instância:{' '}
                        <span className="text-gray-first">
                          {legalInstance.name}
                        </span>
                      </span>
                      <span>
                        Número:{' '}
                        <span className="text-gray-first">{process.code}</span>
                      </span>
                      <span>
                        Juízo:{' '}
                        <span className="text-gray-first">
                          {process.judgment}
                        </span>
                      </span>
                      <span>
                        Vara:{' '}
                        <span className="text-gray-first">
                          {legalCourt.name}
                        </span>
                      </span>
                      <span>
                        Foro:{' '}
                        <span className="text-gray-first">
                          {legalForum.name}
                        </span>
                      </span>
                    </div>
                    <div className="d-flex flex-column gapy-awe-12">
                      <span>
                        Ação:{' '}
                        <span className="text-gray-first">
                          {process.action}
                        </span>
                      </span>
                      <span>
                        Link do tribunal:{' '}
                        <a
                          href={process.link}
                          target="_blank"
                          className="text-brand-first"
                          rel="noreferrer"
                        >
                          Link atendimento
                        </a>
                      </span>
                      <span>
                        Descrição do processo:{' '}
                        <span className="text-gray-first">
                          {process.description}
                        </span>
                      </span>
                    </div>
                    <div className="d-flex flex-column gapy-awe-12">
                      <span>
                        Valor do honorário:{' '}
                        <span className="text-gray-first">
                          {process.fee_amount}
                        </span>
                      </span>
                      <span>
                        Valor da causa:{' '}
                        <span className="text-gray-first">
                          {process.fee_cause}
                        </span>
                      </span>
                      <span>
                        Distribuído em:{' '}
                        <span className="text-gray-first">
                          {format(
                            new Date(process.distributed_in),
                            'dd/MM/yyyy'
                          )}
                        </span>
                      </span>
                      <span>
                        Valor da condenação:{' '}
                        <span className="text-gray-first">
                          {process.fee_condimnation}
                        </span>
                      </span>
                      <span>
                        Observações:{' '}
                        <span className="text-gray-first">
                          {process.observation_description}
                        </span>
                      </span>
                      <span>
                        Acesso:{' '}
                        <span className="text-gray-first">
                          {process.public ? 'Público' : 'Privado'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div>
                  <h4 className="fz-16 text-gray-first fw-bold mb-4">
                    Atividades e eventos
                  </h4>
                  <div className="d-flex flex-column gapy-3">
                    {tasks.length > 0 && (
                      <div className="d-flex flex-column gapy-2">
                        {tasks.map((task) => (
                          <button
                            type="button"
                            className="task"
                            onClick={() => {
                              setTaskModalData({ ...task });
                              setTaskModalOpen(true);
                            }}
                            key={`task.${task.id}`}
                          >
                            Tarefa
                          </button>
                        ))}
                      </div>
                    )}
                    {events.length > 0 && (
                      <div className="d-flex flex-column gapy-2">
                        {events.map((event) => (
                          <button
                            type="button"
                            className="event"
                            onClick={() => {
                              setEventModalData({ ...event });
                              setEventModalOpen(true);
                            }}
                            key={`event.${event.id}`}
                          >
                            <span>
                              {format(
                                new Date(event.starts_in),
                                'dd/MM/yyyy HH:mm'
                              )}{' '}
                              -{' '}
                              {format(
                                new Date(event.ends_at),
                                'dd/MM/yyyy HH:mm'
                              )}
                            </span>
                            <strong>Evento</strong>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col">
                <div>
                  <h4 className="fz-16 text-gray-first fw-bold mb-4">
                    Documentos anexados
                  </h4>
                  <div className="d-flex flex-column gapy-2">
                    {files.map((file) => (
                      <a
                        href={route('process.files.show', file.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 ps-awe-20 text-blue-first fw-bold border border-gray-fifth rounded text-decoration-none d-flex flex-row justify-content-between align-items-center"
                        key={file.path}
                      >
                        <span className="text-truncate">{file.mask}</span>
                        <FaDownload />
                      </a>
                    ))}
                    <div className="px-4 pb-awe-32 pt-3 d-flex flex-column gapy-3 border border-gray-fifth rounded">
                      <span className="text-blue-first fw-bold">
                        Adicionar arquivo
                      </span>
                      <div
                        {...getRootProps({
                          className: `cursor-pointer ${
                            dragging ? 'dragging' : ''
                          }`.trim(),
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
                                <span className="fw-bold text-blue-first ">
                                  Busque
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AuthLayout>

      <ShowTask
        showModalViewTask={taskModalOpen}
        itemFocusData={taskModalData}
        setShowModalViewTask={setTaskModalOpen}
        showActionArea={false}
      />
      <ShowEvent
        showModalViewEvent={eventModalOpen}
        itemFocusData={eventModalData}
        setShowModalViewEvent={setEventModalOpen}
        showActionArea={false}
      />
    </>
  );
}
