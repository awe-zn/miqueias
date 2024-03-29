import { useEffect, useState } from 'react';
import { BiChevronRight, BiChevronLeft, BiCalendarCheck } from 'react-icons/bi';
import {
  FaTasks,
  FaRegUser,
  FaRegAddressCard,
  FaRegFolder,
} from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { Link, usePage } from '@inertiajs/inertia-react';

import { useMediaQuery } from '../../hooks/useMediaQuery';

export const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    user: { role },
  } = usePage().props;

  const isPortable = useMediaQuery('(max-width: 1200px)');

  useEffect(() => {
    if (isPortable) return setIsVisible(false);
    return setIsVisible(true);
  }, [isPortable]);

  return (
    <nav
      className={`sidebar ${isPortable ? 'shadow' : ''} ${
        !isVisible ? 'hide' : ''
      }`.trim()}
    >
      <div className="content">
        <ul className="links-list">
          <li>
            <Link
              tabIndex={0}
              href={route('home')}
              className={route().current('home') ? 'active' : undefined}
            >
              <FaTasks size={24} />
              <span className="label">Área de trabalho</span>
            </Link>
          </li>
          {role === 'advocate' && (
            <>
              <li>
                <Link
                  tabIndex={0}
                  href={route('calendar.index')}
                  className={
                    route().current().startsWith('calendar')
                      ? 'active'
                      : undefined
                  }
                >
                  <BiCalendarCheck size={24} />
                  <span className="label">Agenda</span>
                </Link>
              </li>
              <li>
                <Link
                  tabIndex={0}
                  href={route('client.index')}
                  className={
                    route().current().startsWith('client')
                      ? 'active'
                      : undefined
                  }
                >
                  <FaRegAddressCard size={24} />
                  <span className="label">Clientes</span>
                </Link>
              </li>
              <li>
                <Link
                  tabIndex={0}
                  href={route('advocate.index')}
                  className={
                    route().current().startsWith('advocate')
                      ? 'active'
                      : undefined
                  }
                >
                  <MdAdminPanelSettings size={24} />
                  <span className="label">Advogados</span>
                </Link>
              </li>
              <li>
                <Link
                  tabIndex={0}
                  href={route('petition.index')}
                  className={
                    route().current().startsWith('petition')
                      ? 'active'
                      : undefined
                  }
                >
                  <AiOutlineFileProtect size={24} />
                  <span className="label">Modelos de petições</span>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              tabIndex={0}
              href={route('process.index')}
              className={
                route().current().startsWith('process') ? 'active' : undefined
              }
            >
              <FaRegFolder size={24} />
              <span className="label">Processos</span>
            </Link>
          </li>
          <li>
            <Link
              tabIndex={0}
              href={route('profile.index')}
              className={
                route().current().startsWith('profile') ? 'active' : undefined
              }
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
          onClick={() => setIsVisible(!isVisible)}
        >
          {!isVisible ? (
            <BiChevronRight size={24} />
          ) : (
            <BiChevronLeft size={24} />
          )}
        </button>
      )}
    </nav>
  );
};
