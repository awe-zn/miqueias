/* eslint-disable consistent-return */
/* eslint-disable default-case */

import { FaChevronRight } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

import plane from '../../images/cases-contacts/plane.png';
import games from '../../images/cases-contacts/games.png';
import socials from '../../images/cases-contacts/socials.png';
import delivery from '../../images/cases-contacts/delivery.png';
import delivery2 from '../../images/cases-contacts/delivery-2.png';
import road from '../../images/cases-contacts/road.png';
import health from '../../images/cases-contacts/health.png';
import financies from '../../images/cases-contacts/financies.png';
import host from '../../images/cases-contacts/host.png';
import construction from '../../images/cases-contacts/construction.png';
import electric from '../../images/cases-contacts/electric.png';
import traffic from '../../images/cases-contacts/traffic.png';
import phone from '../../images/cases-contacts/phone.png';
import education from '../../images/cases-contacts/education.png';
import labor from '../../images/cases-contacts/labor.png';
import lgpd from '../../images/cases-contacts/lgpd.png';
import cybercrime from '../../images/cases-contacts/cybercrime.png';

const sectors = [
  { title: 'Aéreo', icon: plane },
  { title: 'Jogos', icon: games },
  { title: 'Redes sociais', icon: socials },
  { title: 'Entregas', icon: delivery },
  { title: 'Delivery', icon: delivery2 },
  { title: 'Rodoviário', icon: road },
  { title: 'Saúde', icon: health },
  { title: 'Financeiro', icon: financies },
  { title: 'Hospedagem', icon: host },
  { title: 'Imobiliário', icon: construction },
  { title: 'Elétrico', icon: electric },
  { title: 'Trânsito', icon: traffic },
  { title: 'Telefonia', icon: phone },
  { title: 'Educação', icon: education },
  { title: 'Trabalhista', icon: labor },
  { title: 'LGPD', icon: lgpd },
  { title: 'Crimes cibernéticos', icon: cybercrime },
];

const maxSectors = 6;

export const CaseContact = () => {
  const [sectorIndex, setSectorIndex] = useState(null);
  const [currentStage, setCurrentStage] = useState(1);
  const [typeEntity, setTypeEntity] = useState('');
  const [nameCase, setNameCase] = useState('');
  const [messageCase, setMessageCase] = useState('');

  const sectionEl = useRef(null);

  useEffect(() => {
    if (currentStage > maxSectors) setCurrentStage(maxSectors);

    sectionEl.current.scrollIntoView();
  }, [currentStage]);

  const handleChangeTypeEntity = ({ target: { value } }) => {
    setTypeEntity(value);
  };

  return (
    <section ref={sectionEl}>
      <div className="container pt-4 pb-5">
        <div className="row justify-content-center">
          <div className="col-md-11 col-lg-10">
            <div className="bg-gray-third p-4 p-md-awe-32 rounded">
              {(() => {
                switch (currentStage) {
                  case 1:
                    return (
                      <div className="d-flex flex-column gapy-4">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item active">
                            Sobre o caso
                          </li>
                          <li className="breadcrumb-item">
                            Documentos e arquivos
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            Suas informações
                          </li>
                        </ol>
                        <h2 className="fw-bold fz-24 text-blue-first">
                          Em qual setor você teve um problema?
                        </h2>
                        <div className="d-flex flex-column gapy-3">
                          <div className="row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 gapy-4">
                            {sectors.map(({ title, icon }, index) => (
                              <div
                                className="col"
                                key={title.replaceAll(' ', '')}
                              >
                                <button
                                  type="button"
                                  className={`sector-select ${
                                    index === sectorIndex ? 'active' : ''
                                  }`.trim()}
                                  onClick={() => setSectorIndex(index)}
                                >
                                  <img src={icon} alt={title} />
                                  {title}
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            className={`ms-auto btn-reset fw-bold d-flex flex-row align-items-center gapx-2 transition ${
                              sectorIndex !== null && sectorIndex >= 0
                                ? 'link-brand-second'
                                : 'opacity-75 pe-none user-select-none'
                            }`.trim()}
                            onClick={() => setCurrentStage(currentStage + 1)}
                            disabled={sectorIndex === null}
                          >
                            Prosseguir <FaChevronRight />
                          </button>
                        </div>
                      </div>
                    );
                  case 2:
                    return (
                      <div className="d-flex flex-column gapy-4">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item active">
                            Sobre o caso
                          </li>
                          <li className="breadcrumb-item">
                            Documentos e arquivos
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            Suas informações
                          </li>
                        </ol>
                        <h2 className="fw-bold fz-24 text-blue-first m-0">
                          Detalhamento do caso
                        </h2>
                        <div className="d-flex flex-column gapy-3">
                          <strong className="gray-first fw-bold">
                            Quem você quer processar?
                          </strong>
                          <div className="d-flex flex-row flex-wrap gapx-4 gapy-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="type-entity"
                                value="legal-person"
                                id="legal-person"
                                onChange={handleChangeTypeEntity}
                                checked={typeEntity === 'legal-person'}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="legal-person"
                              >
                                Pessoa Jurídica
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="type-entity"
                                value="individual-person"
                                id="individual-person"
                                onChange={handleChangeTypeEntity}
                                checked={typeEntity === 'individual-person'}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="individual-person"
                              >
                                Pessoa Física
                              </label>
                            </div>
                          </div>
                        </div>
                        {typeEntity && (
                          <>
                            <div>
                              <label htmlFor="name" className="form-label">
                                Nome
                                {typeEntity === 'legal-person' && ' da empresa'}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder={`Nome${
                                  typeEntity === 'legal-person'
                                    ? ' da empresa'
                                    : ''
                                }`}
                                value={nameCase}
                                onChange={({ target: { value } }) =>
                                  setNameCase(value)
                                }
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Detalhamento do caso
                              </label>
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="8"
                                placeholder="Descreva o seu problema"
                                value={messageCase}
                                onChange={({ target: { value } }) =>
                                  setMessageCase(value)
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className={`ms-auto btn-reset fw-bold d-flex flex-row align-items-center gapx-2 transition ${
                                nameCase && messageCase
                                  ? 'link-brand-second'
                                  : 'opacity-75 pe-none user-select-none'
                              }`.trim()}
                              onClick={() => setCurrentStage(currentStage + 1)}
                              disabled={!(nameCase && messageCase)}
                            >
                              Prosseguir <FaChevronRight />
                            </button>
                          </>
                        )}
                      </div>
                    );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
