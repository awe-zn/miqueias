import { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { FaPlus } from 'react-icons/fa';

import { AuthLayout } from '../../layout/Auth';
import { Title } from '../../components/auth/Title';
import Create from '../../components/users/Create';
import Show from '../../components/users/Show';

export default function Clients() {
  const { advocates: fetchedClients } = usePage().props;

  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [itemFocusData, setItemFocusData] = useState({});

  const clientsFiltered = useMemo(() => {
    if (!searchTerm) return [...clients];

    let newClients = [...clients];

    newClients = newClients.filter(({ name, email }) => {
      let include = name.toLowerCase().includes(searchTerm.toLowerCase());

      if (include) return true;

      include = email.toLowerCase().includes(searchTerm.toLowerCase());

      return include;
    });

    return [...newClients];
  }, [searchTerm, clients]);

  useEffect(() => {
    setClients([...fetchedClients]);
  }, [fetchedClients]);

  return (
    <AuthLayout>
      <div className="container">
        <div className="row gapy-4">
          <div className="col-12">
            <div className="mb-2 d-flex flex-row">
              <Title label="Advogados" />
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
                placeholder="Pesquisar nome, e-mail..."
                value={searchTerm}
                onChange={({ target: { value } }) => setSearchTerm(value)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="table-clients table-custom">
              <div className="head">
                <span className="column">Nome</span>
                <span className="column">Telefone</span>
                <span className="column">E-mail</span>
              </div>
              <div className="body">
                {clientsFiltered.map((item) => {
                  const { id, name, phone_number: phoneNumber, email } = item;

                  return (
                    <button
                      type="button"
                      className="item"
                      key={id}
                      onClick={() => {
                        setShowModalView(true);
                        setItemFocusData({ ...item });
                      }}
                    >
                      <span className="column">{name}</span>
                      <span className="column">{phoneNumber}</span>
                      <span className="column">{email}</span>
                    </button>
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
        roleToCreate="advocate"
      />
      <Show
        showModalView={showModalView}
        setShowModalView={setShowModalView}
        itemFocusData={itemFocusData}
        showActionArea={false}
      />
    </AuthLayout>
  );
}
