import { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { FaPlus } from 'react-icons/fa';

import { AuthLayout } from '../../layout/Auth';

export default function Process() {
  const { process } = usePage().props;

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AuthLayout>
      <section>
        <div className="container">
          <div className="row gapy-2 mb-4">
            <div className="col-auto">
              <h1 className="text-blue-first fw-bold fz-24 m-0">Processos</h1>
            </div>
            <div className="col-auto ms-auto">
              <Link
                href={route('process.create')}
                className="btn btn-brand-second fw-bold text-white d-flex align-items-center gapx-3"
              >
                Adicionar <FaPlus />
              </Link>
            </div>
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
                placeholder="Pesquisar título, cliente, foro..."
                value={searchTerm}
                onChange={({ target: { value } }) => setSearchTerm(value)}
              />
            </div>
            <div className="col-auto ms-auto ms-md-0">
              <select className="form-control">
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
                  {process.map(
                    ({
                      id,
                      title,
                      clients: [{ name: clientName }],
                      action,
                      legal_forum: { name: legalForumName },
                      updated_at: updatedAt,
                      finished,
                    }) => {
                      const updatedAtDate = new Date(updatedAt);

                      return (
                        <Link
                          href={route('process.edit', id)}
                          className="item"
                          key={id}
                        >
                          <span className="column column-badge">
                            <span
                              className={`badge-calendar ${
                                finished ? 'finished' : 'in-progress'
                              }`.trim()}
                            >
                              {finished ? 'Concluído' : 'Em andamento'}
                            </span>
                          </span>
                          <span className="column">{title}</span>
                          <span className="column">{clientName}</span>
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
