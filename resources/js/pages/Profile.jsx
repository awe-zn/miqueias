import { Tab, Tabs } from 'react-bootstrap';
import { usePage } from '@inertiajs/inertia-react';
import { useMemo } from 'react';

import { AuthLayout } from '../layout/Auth';

import { Title } from '../components/auth/Title';
import { Identification } from '../components/profile/Identification';
import { Office } from '../components/profile/Office';
import { Privacy } from '../components/profile/Privacy';
import { Security } from '../components/profile/Security';

export default function Profile() {
  const {
    user: { role },
  } = usePage().props;
  const isAdmin = useMemo(() => role === 'advocate', [role]);

  return (
    <AuthLayout>
      <main>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="mb-awe-32">
                  <Title label="Meu perfil" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Tabs
                  defaultActiveKey="identification"
                  transition
                  className="mb-4 tab-profile"
                  mountOnEnter
                  unmountOnExit
                >
                  <Tab eventKey="identification" title="Identificação">
                    <Identification />
                  </Tab>
                  {isAdmin && (
                    <Tab eventKey="profile" title="Escritório">
                      <Office />
                    </Tab>
                  )}
                  <Tab eventKey="contact" title="Notificações">
                    <Security />
                  </Tab>
                  {isAdmin && (
                    <Tab eventKey="security" title="Segurança">
                      <Privacy />
                    </Tab>
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AuthLayout>
  );
}
