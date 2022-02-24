import { usePage } from '@inertiajs/inertia-react';
import { useEffect, useMemo, useState } from 'react';

import { AuthLayout } from '../layout/Auth';
import { Title } from '../components/auth/Title';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const { clients: fetchedClients } = usePage().props;

  useEffect(() => {
    setClients([...fetchedClients]);
  }, []);

  return (
    <AuthLayout>
      <div className="container">
        <div className="row gapy-4">
          <div className="col-12">
            <div className="mb-2">
              <Title label="Clientes" />
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
                {clientsFiltered.map(
                  ({ id, name, phone_number: phoneNumber, email }) => (
                    <div className="item" key={id}>
                      <span className="column">{name}</span>
                      <span className="column">{phoneNumber}</span>
                      <span className="column">{email}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
