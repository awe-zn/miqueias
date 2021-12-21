import { FaRegFolder } from 'react-icons/fa';

import { AuthLayout } from '../../layout/Auth';

export default function Process() {
  return (
    <AuthLayout>
      <div className="container g-0">
        <div className="row gapy-4">
          <div className="col-12">
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <FaRegFolder className="me-2" />
                  Processos
                </li>
                <li className="breadcrumb-item active">Adicionar processo</li>
              </ol>
            </div>
          </div>
          <div className="col-12">
            <h1 className="text-blue-first fw-bold fz-24 m-0">
              Adicionar processo
            </h1>
          </div>
          <div className="col-8">
            <div className="row gapy-awe-32 pt-2">
              <div className="col-12">
                <div>
                  <label htmlFor="name" className="form-label">
                    Cliente
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Nome do Cliente"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
