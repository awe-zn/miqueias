import { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { FaPlus } from 'react-icons/fa';

import { AuthLayout } from '../../layout/Auth';
import { Title } from '../../components/auth/Title';
import Create from '../../components/petitions/Create';

export default function Clients() {
  const { petitions: fetchedPetitions } = usePage().props;

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [petitions, setPetitions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const clientsFiltered = useMemo(() => {
    if (!searchTerm) return [...petitions];

    let newClients = [...petitions];

    newClients = newClients.filter(({ name }) => {
      const include = name.toLowerCase().includes(searchTerm.toLowerCase());

      return include;
    });

    return [...newClients];
  }, [searchTerm, petitions]);

  useEffect(() => {
    setPetitions([...fetchedPetitions]);
  }, [fetchedPetitions]);

  return (
    <AuthLayout>
      <div className="container">
        <div className="row gapy-4">
          <div className="col-12">
            <div className="mb-2 d-flex flex-row">
              <Title label="Petições" />
              <button
                type="button"
                onClick={() => setShowModalCreate(true)}
                className="btn btn-brand-second ms-auto fw-bold text-white d-flex align-items-center gapx-3"
              >
                Criar <FaPlus />
              </button>
            </div>
          </div>
          <div className="col-md-7 col-lg-5">
            <div>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Pesquisar nome..."
                value={searchTerm}
                onChange={({ target: { value } }) => setSearchTerm(value)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="table-clients table-custom">
              <div className="head">
                <span className="column">Nome</span>
              </div>
              <div className="body">
                {clientsFiltered.map((item) => {
                  const { id, name } = item;

                  return (
                    <a
                      type="button"
                      className="item"
                      key={id}
                      target="_blank"
                      href={route('petition.show', id)}
                      rel="noreferrer"
                    >
                      <span className="column">{name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Create
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
    </AuthLayout>
  );
}
