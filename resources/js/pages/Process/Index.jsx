import { Link } from '@inertiajs/inertia-react';
import { FaPlus } from 'react-icons/fa';

import { AuthLayout } from '../../layout/Auth';

export default function Process() {
  return (
    <AuthLayout>
      <div className="container g-0">
        <div className="row gapy-2">
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
    </AuthLayout>
  );
}
