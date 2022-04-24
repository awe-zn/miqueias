import { useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { addHours, format, isToday, startOfToday } from 'date-fns';

import { AuthLayout } from '../layout/Auth';

import ShowEvent from '../components/Calendar/ShowEvent';

const TASKSDEFAULT = {
  amount: 0,
  percentage: 0,
};

export default function Dashboard() {
  const { process, events, tasks: tasksFetched } = usePage().props;

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventModalData, setEventModalData] = useState({});

  const tasks = useMemo(() => {
    const tasksAmount = tasksFetched.length;

    const tasksConcluded = { ...TASKSDEFAULT };
    const tasksLate = { ...TASKSDEFAULT };
    const tasksToDo = { ...TASKSDEFAULT };

    const tasksConcludedFilter = tasksFetched.filter((task) => task.concluded);
    const tasksConcludedAmount = tasksConcludedFilter.length;
    const tasksConcludedPercentage = Math.floor(
      (tasksConcludedAmount / tasksAmount) * 100
    );
    tasksConcluded.amount = tasksConcludedAmount;
    tasksConcluded.percentage = tasksConcludedPercentage;

    const tasksLateFilter = tasksFetched.filter(
      (task) =>
        !task.concluded &&
        addHours(new Date(task.schedule_at), 3) < startOfToday(new Date())
    );
    const tasksLateAmount = tasksLateFilter.length;
    const tasksLatePercentage = Math.floor(
      (tasksLateAmount / tasksAmount) * 100
    );
    tasksLate.amount = tasksLateAmount;
    tasksLate.percentage = tasksLatePercentage;

    const tasksToDoFilter = tasksFetched.filter(
      (task) =>
        (!task.concluded &&
          addHours(new Date(task.schedule_at), 3) > startOfToday(new Date())) ||
        isToday(addHours(new Date(task.schedule_at), 3))
    );
    const tasksToDoAmount = tasksToDoFilter.length;
    const tasksToDoPercentage = Math.floor(
      (tasksToDoAmount / tasksAmount) * 100
    );
    tasksToDo.amount = tasksToDoAmount;
    tasksToDo.percentage = tasksToDoPercentage;

    return { tasksConcluded, tasksLate, tasksToDo };
  }, [tasksFetched]);

  return (
    <>
      <AuthLayout>
        <div className="container">
          <div className="row gapy-awe-40">
            <div className="col-lg-4">
              <div className="d-flex flex-column gapy-awe-20 p-3 shadow rounded h-100">
                <h6 className="fw-bold m-0">Próximos eventos</h6>
                {events.map((event) => {
                  const startsInDate = new Date(event.starts_in);
                  const startsInIsToday = isToday(startsInDate);
                  const startsInFormated = startsInIsToday
                    ? format(startsInDate, 'HH:mm')
                    : format(startsInDate, 'dd/MM/yyyy HH:mm');

                  const endsAtDate = new Date(event.ends_at);
                  const endsAtIsToday = isToday(endsAtDate);
                  const endsAtFormated = endsAtIsToday
                    ? format(endsAtDate, 'HH:mm')
                    : format(endsAtDate, 'dd/MM/yyyy HH:mm');

                  return (
                    <button
                      type="button"
                      className="event-dashboard"
                      onClick={() => {
                        setEventModalData({ ...event });
                        setEventModalOpen(true);
                      }}
                      key={`event.${event.id}`}
                    >
                      <span>
                        {startsInFormated} - {endsAtFormated}
                      </span>
                      <strong>Evento</strong>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="d-flex flex-column align-items-start gapy-3 p-3 shadow rounded h-100">
                <h6 className="fw-bold m-0">Minhas atividades</h6>
                <select className="form-control dashboard-filter">
                  <option>Esta semana</option>
                </select>
                <div className="row row-cols-1 row-cols-md-3 gx-3 gapy-3 w-100">
                  <div className="col">
                    <div
                      className="activity-box"
                      style={{ '--symbol-color': '#27AE60' }}
                    >
                      <div className="activity-title">Concluídas</div>
                      <div className="activity-info">
                        <div className="activity-amount-area">
                          <div className="activity-amount-symbol" />
                          <div className="activity-amount">
                            {tasks.tasksConcluded.amount}
                          </div>
                        </div>
                        <div className="activity-percentage">
                          {tasks.tasksConcluded.percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div
                      className="activity-box"
                      style={{ '--symbol-color': '#E2B93B' }}
                    >
                      <div className="activity-title">Atrasadas</div>
                      <div className="activity-info">
                        <div className="activity-amount-area">
                          <div className="activity-amount-symbol" />
                          <div className="activity-amount">
                            {tasks.tasksLate.amount}
                          </div>
                        </div>
                        <div className="activity-percentage">
                          {tasks.tasksLate.percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div
                      className="activity-box"
                      style={{ '--symbol-color': '#3F89B2' }}
                    >
                      <div className="activity-title">À realizar</div>
                      <div className="activity-info">
                        <div className="activity-amount-area">
                          <div className="activity-amount-symbol" />
                          <div className="activity-amount">
                            {tasks.tasksToDo.amount}
                          </div>
                        </div>
                        <div className="activity-percentage">
                          {tasks.tasksToDo.percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <section className="d-flex flex-column gapy-3">
                <h6 className="fw-bold m-0 ms-3">Processos em andamento</h6>
                <div className="table-process table-custom">
                  <div className="head">
                    <span className="column">Status</span>
                    <span className="column">Título</span>
                    <span className="column">Cliente</span>
                    <span className="column">Ação/Foro</span>
                    <span className="column">Última mov.</span>
                  </div>
                  <div className="body">
                    {process.map(
                      ({
                        id,
                        title,
                        clients,
                        action,
                        legal_forum: { name: legalForumName },
                        updated_at: updatedAt,
                        concluded,
                      }) => {
                        const updatedAtDate = new Date(updatedAt);
                        const clientsName = clients
                          .map(({ name: clientName }) => clientName)
                          .toString()
                          .replaceAll(',', ', ');

                        return (
                          <Link
                            href={route('process.show', id)}
                            className="item"
                            key={id}
                          >
                            <span className="column column-badge">
                              <span
                                className={`badge-calendar ${
                                  concluded ? 'finished' : 'in-progress'
                                }`.trim()}
                              >
                                {concluded ? 'Concluído' : 'Em andamento'}
                              </span>
                            </span>
                            <span className="column">{title}</span>
                            <span className="column">{clientsName}</span>
                            <span className="column">
                              {action} / {legalForumName}
                            </span>
                            <span className="column">
                              {`${updatedAtDate.getDate()}/${
                                updatedAtDate.getMonth() + 1
                              }/${updatedAtDate.getFullYear()}`}
                            </span>
                          </Link>
                        );
                      }
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </AuthLayout>

      <ShowEvent
        showModalViewEvent={eventModalOpen}
        itemFocusData={eventModalData}
        setShowModalViewEvent={setEventModalOpen}
        showActionArea={false}
      />
    </>
  );
}
