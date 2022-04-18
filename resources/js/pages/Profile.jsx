import { Tab, Tabs } from 'react-bootstrap';

import { AuthLayout } from '../layout/Auth';

import { Title } from '../components/auth/Title';
import { Identification } from '../components/profile/Identification';
import { Office } from '../components/profile/Office';
import { Privacy } from '../components/profile/Privacy';

export default function Profile() {
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
                  <Tab eventKey="profile" title="Escritório">
                    <Office />
                  </Tab>
                  <Tab eventKey="contact" title="Notificações">
                    <div>Em breve!</div>
                  </Tab>
                  <Tab eventKey="Se" title="Segurança">
                    <Privacy />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AuthLayout>
  );
}
