import { useState, useMemo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { usePage } from '@inertiajs/inertia-react';

import { AuthLayout } from '../layout/Auth';
import { Title } from '../components/auth/Title';
import CreateTask from '../components/Calendar/CreateTask';
import CreateEvent from '../components/Calendar/CreateEvent';

export default function Calendar() {
  const { events, tasks } = usePage().props;

  const calendar = useMemo(() => {
    const tasksFetched = tasks.map((task) => ({ ...task, type: 'task' }));
    const eventsFetched = events.map((event) => ({ ...event, type: 'event' }));

    return [...tasksFetched, ...eventsFetched];
  }, [events, tasks]);

  const [showModalCreateTask, setShowModalCreateTask] = useState(false);
  const [showModalCreateEvent, setShowModalCreateEvent] = useState(false);

  return (
    <AuthLayout>
      <main>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-row align-items-start gap-2 flex-wrap">
                  <div className="mb-awe-32">
                    <Title label="Agenda" />
                  </div>
                  <Dropdown align="end" className="ms-auto">
                    <Dropdown.Toggle
                      className="text-white fw-bold fz-14 px-e-2 d-flex flex-row gapx-3 align-items-center"
                      variant="brand-second"
                    >
                      Adicionar <FaPlus />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-calendar">
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => setShowModalCreateTask(true)}
                      >
                        Tarefa
                      </button>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => setShowModalCreateEvent(true)}
                      >
                        Evento
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
            <div className="row flex-wrap-reverse align-items-center gapy-2 mb-awe-32">
              <div className="col-auto">
                <div className="d-flex flex-row gapx-4">
                  <div className="form-check calendar">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="tasks"
                    />
                    <label className="form-check-label" htmlFor="tasks">
                      Tarefas
                    </label>
                  </div>
                  <div className="form-check calendar">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="events"
                    />
                    <label className="form-check-label" htmlFor="events">
                      Eventos
                    </label>
                  </div>
                </div>
              </div>
              <div className="col">
                <div>
                  <input
                    id="search"
                    name="search"
                    className="form-control form-search"
                    type="text"
                    placeholder="Pesquisar evento ou tarefa..."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="table-calendar table-custom">
                  <div className="head">
                    <span className="column">Data/hora</span>
                    <span className="column">Tipo</span>
                    <span className="column">Compromisso</span>
                  </div>
                  <div className="body">
                    {calendar.map(({ title, type, id }) => (
                      <div className="item" key={`${id}-${type}`}>
                        <span className="column">23/09/2021 - 12h</span>
                        <span className="column column-badge">
                          <span className={`badge-calendar ${type}`}>
                            {type === 'event' ? 'Evento' : 'Tarefa'}
                          </span>
                        </span>
                        <span className="column">{title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CreateTask
        showModalCreateTask={showModalCreateTask}
        setShowModalCreateTask={setShowModalCreateTask}
      />
      <CreateEvent
        showModalCreateEvent={showModalCreateEvent}
        setShowModalCreateEvent={setShowModalCreateEvent}
      />
    </AuthLayout>
  );
}
