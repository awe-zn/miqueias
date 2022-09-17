import { useMemo } from 'react';
import { usePage, Link } from '@inertiajs/inertia-react';
import { FaChevronDown } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';

import imageHelper from '../../helper/image';

import logo from '../../../images/logo.png';

export const Header = () => {
  const {
    appEnvironment,
    user: { name, avatar },
  } = usePage().props;
  const avatarId = useMemo(() => avatar?.id || 0, [avatar]);

  return (
    <header className="shadow sticky-top bg-white">
      <div className="container-fluid py-3 px-5">
        <div className="row align-items-center">
          <div className="col-4 col-md-auto">
            <img
              src={imageHelper({ appEnvironment, path: logo })}
              alt="Miqueias Costa"
              className="img-fluid img-logo"
            />
          </div>
          <div className="col-8 col-md-auto ms-auto">
            <div className="d-flex justify-content-end">
              <Dropdown align="end">
                <Dropdown.Toggle className="dropdown-fit mx-n1 px-1">
                  <div className="d-flex align-items-center gapx-3">
                    <img
                      src={route('profile.avatar', { avatar: avatarId })}
                      alt={name}
                      className="img-fluid rounded-circle object-cover profile-pic"
                    />

                    <span className="text-blue-first fw-semibold d-flex align-items-center gapx-2">
                      <span className="user-name">{name}</span>
                      <FaChevronDown />
                    </span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link href={route('profile.index')} className="dropdown-item">
                    Meu perfil
                  </Link>
                  <Link
                    href={route('logout')}
                    method="post"
                    className="dropdown-item"
                    as="button"
                  >
                    Sair
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
