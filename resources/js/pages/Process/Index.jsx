import { useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { FaPlus } from 'react-icons/fa';

import { AuthLayout } from '../../layout/Auth';

export default function Process() {
  const {
    process,
    user: { role },
  } = usePage().props;

  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProcess = useMemo(() => {
    const dataFiltered = process
      .filter(
        (item) => item.title.toLowerCase().search(searchTerm.toLowerCase()) >= 0
      )
      .filter(({ finished }) => {
        if (filterType === 'finished') return finished;
        if (filterType === 'inProgress') return !finished;

        return true;
      });

    return [...dataFiltered];
  }, [process, searchTerm, filterType]);

  return (
    <AuthLayout>
      <section>
        <div className="container">
          <div className="row gapy-2 mb-4">
            <div className="col-auto">
              <h1 className="text-blue-first fw-bold fz-24 m-0">Processos</h1>
            </div>
            {role === 'advocate' && (
              <div className="col-auto ms-auto">
                <Link
                  href={route('process.create')}
                  className="btn btn-brand-second fw-bold text-white d-flex align-items-center gapx-3"
                >
                  Adicionar <FaPlus />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row gapy-2">
            <div className="col-md-7 col-lg-5">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Pesquisar título..."
                value={searchTerm}
                onChange={({ target: { value } }) => setSearchTerm(value)}
              />
            </div>
            <div className="col-auto ms-auto ms-md-0">
              <select
                className="form-control"
                value={filterType}
                onChange={({ target: { value } }) => setFilterType(value)}
              >
                <option value="all">Todos</option>
                <option value="finished">Concluído</option>
                <option value="inProgress">Em andamento</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-process table-custom mt-4">
                <div className="head">
                  <span className="column">Status</span>
                  <span className="column">Título</span>
                  <span className="column">Cliente</span>
                  <span className="column">Ação/Foro</span>
                  <span className="column">Última mov.</span>
                </div>
                <div className="body">
                  {filteredProcess.map(
                    ({
                      id,
                      title,
                      clients,
                      action,
                      legal_forum: legalForumName,
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
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}
