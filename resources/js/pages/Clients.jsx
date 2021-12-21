import { usePage } from '@inertiajs/inertia-react';
import { useEffect, useMemo, useState } from 'react';
import { AuthLayout } from '../layout/Auth';

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
      <div className="container g-0">
        <div className="row gapy-4">
          <div className="col-12">
            <h1 className="text-blue-first fw-bold fz-24 mb-2">Clientes</h1>
          </div>
          <div className="col-5">
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
            <table className="table table-striped">
              <thead>
                <tr className="table-awe">
                  <th scope="col">Nome</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">E-mail</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {clientsFiltered.map(
                  ({ id, name, phone_number: phoneNumber, email }) => (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{phoneNumber}</td>
                      <td>{email}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
