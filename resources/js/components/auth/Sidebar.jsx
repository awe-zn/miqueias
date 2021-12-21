import { useEffect, useState } from 'react';
import { BiChevronRight, BiChevronLeft, BiCalendarCheck } from 'react-icons/bi';
import {
  FaTasks,
  FaRegUser,
  FaRegAddressCard,
  FaRegComment,
  FaRegFolder,
} from 'react-icons/fa';
import { Link, usePage } from '@inertiajs/inertia-react';

import { useMediaQuery } from '../../hooks/useMediaQuery';

export const Sidebar = () => {
  const [isVisiable, setIsVisiable] = useState(false);

  const {
    user: { role },
  } = usePage().props;

  const isPortable = useMediaQuery('(max-width: 1200px)');

  useEffect(() => {
    if (isPortable) return setIsVisiable(false);
    return setIsVisiable(true);
  }, [isPortable]);

  return (
    <nav
      className={`sidebar ${isPortable ? 'shadow' : ''} ${
        !isVisiable ? 'hide' : ''
      }`.trim()}
    >
      <div className="content">
        <ul className="links-list">
          <li>
            <Link
              href={route('home')}
              className={route().current('home') ? 'active' : ''}
            >
              <FaTasks size={24} />
              <span className="label">Área de trabalho</span>
            </Link>
          </li>
          {role === 'advocate' && (
            <>
              <li>
                <Link>
                  <BiCalendarCheck size={24} />
                  <span className="label">Agenda</span>
                </Link>
              </li>
              <li>
                <Link
                  href={route('client.index')}
                  className={
                    route().current().startsWith('client') ? 'active' : ''
                  }
                >
                  <FaRegAddressCard size={24} />
                  <span className="label">Clientes</span>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link>
              <FaRegComment size={24} />
              <span className="label">Atendimentos</span>
            </Link>
          </li>
          <li>
            <Link
              href={route('process.index')}
              className={
                route().current().startsWith('process') ? 'active' : ''
              }
            >
              <FaRegFolder size={24} />
              <span className="label">Processos</span>
            </Link>
          </li>
          <li>
            <Link
              href={route('profile')}
              className={route().current('profile') ? 'active' : ''}
            >
              <FaRegUser size={24} />
              <span className="label">Meu perfil</span>
            </Link>
          </li>
        </ul>
      </div>

      {isPortable && (
        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => setIsVisiable(!isVisiable)}
        >
          {!isVisiable ? (
            <BiChevronRight size={24} />
          ) : (
            <BiChevronLeft size={24} />
          )}
        </button>
      )}
    </nav>
  );
};
