import { useState, useMemo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { usePage } from '@inertiajs/inertia-react';

import { AuthLayout } from '../layout/Auth';
import { Title } from '../components/auth/Title';
import CreateTask from '../components/Calendar/CreateTask';
import EditTask from '../components/Calendar/EditTask';
import CreateEvent from '../components/Calendar/CreateEvent';
import ShowEvent from '../components/Calendar/ShowEvent';
import EditEvent from '../components/Calendar/EditEvent';
import ShowTask from '../components/Calendar/ShowTask';

export default function Calendar() {
  const { events, tasks } = usePage().props;

  const [showModalCreateTask, setShowModalCreateTask] = useState(false);
  const [showModalViewTask, setShowModalViewTask] = useState(false);
  const [showModalEditTask, setShowModalEditTask] = useState(false);
  const [showModalCreateEvent, setShowModalCreateEvent] = useState(false);
  const [showModalViewEvent, setShowModalViewEvent] = useState(false);
  const [showModalEditEvent, setShowModalEditEvent] = useState(false);
  const [itemFocusData, setItemFocusData] = useState({});
  const [searchTerm, setSearchTerm] = useState('a');

  const calendar = useMemo(() => {
    const tasksFetched = tasks.map((task) => ({ ...task, type: 'task' }));
    const eventsFetched = events.map((event) => ({ ...event, type: 'event' }));

    return [...tasksFetched, ...eventsFetched];
  }, [events, tasks]);

  const calendarFiltered = useMemo(() => {
    const dataFiltered = calendar.filter(
      (item) => item.title.toLowerCase().search(searchTerm.toLowerCase()) >= 0
    );

    return [...dataFiltered];
  }, [calendar, searchTerm]);

  console.log(calendarFiltered);

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
                    onChange={({ target: { value } }) => setSearchTerm(value)}
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
                    {calendarFiltered.map((item) => {
                      const { title, type, id } = item;

                      return (
                        <button
                          type="button"
                          className="item"
                          key={`${id}-${type}`}
                          onClick={() => {
                            if (type === 'event') {
                              setShowModalViewEvent(true);
                            } else {
                              setShowModalViewTask(true);
                            }
                            setItemFocusData(item);
                          }}
                        >
                          <span className="column">
                            {type === 'event' ? '' : ''}
                          </span>
                          <span className="column column-badge">
                            <span className={`badge-calendar ${type}`}>
                              {type === 'event' ? 'Evento' : 'Tarefa'}
                            </span>
                          </span>
                          <span className="column">{title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CreateTask
          showModalCreateTask={showModalCreateTask}
          setShowModalCreateTask={setShowModalCreateTask}
        />
        <ShowTask
          showModalViewTask={showModalViewTask}
          setShowModalViewTask={setShowModalViewTask}
          itemFocusData={itemFocusData}
          openEditTask={() => setShowModalEditTask(true)}
        />
        <EditTask
          showModalEditTask={showModalEditTask}
          setShowModalEditTask={setShowModalEditTask}
          itemFocusData={itemFocusData}
        />
        <CreateEvent
          showModalCreateEvent={showModalCreateEvent}
          setShowModalCreateEvent={setShowModalCreateEvent}
        />
        <ShowEvent
          showModalViewEvent={showModalViewEvent}
          setShowModalViewEvent={setShowModalViewEvent}
          itemFocusData={itemFocusData}
          openEditEvent={() => setShowModalEditEvent(true)}
        />
        <EditEvent
          showModalEditEvent={showModalEditEvent}
          setShowModalEditEvent={setShowModalEditEvent}
          itemFocusData={itemFocusData}
        />
      </main>
    </AuthLayout>
  );
}
