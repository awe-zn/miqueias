import { FaChevronRight, FaCheck, FaRegFileAlt } from 'react-icons/fa';
import { FiFile } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IMaskInput } from 'react-imask';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';

import imageHelper from '../../helper/image';

import plane from '../../../images/cases-contacts/plane.png';
import games from '../../../images/cases-contacts/games.png';
import socials from '../../../images/cases-contacts/socials.png';
import delivery from '../../../images/cases-contacts/delivery.png';
import delivery2 from '../../../images/cases-contacts/delivery-2.png';
import road from '../../../images/cases-contacts/road.png';
import health from '../../../images/cases-contacts/health.png';
import financies from '../../../images/cases-contacts/financies.png';
import host from '../../../images/cases-contacts/host.png';
import construction from '../../../images/cases-contacts/construction.png';
import electric from '../../../images/cases-contacts/electric.png';
import traffic from '../../../images/cases-contacts/traffic.png';
import phone from '../../../images/cases-contacts/phone.png';
import education from '../../../images/cases-contacts/education.png';
import labor from '../../../images/cases-contacts/labor.png';
import lgpd from '../../../images/cases-contacts/lgpd.png';
import cybercrime from '../../../images/cases-contacts/cybercrime.png';
import family from '../../../images/cases-contacts/family.png';
import old from '../../../images/cases-contacts/old.png';
import tributary from '../../../images/cases-contacts/tributary.png';
import creditRecovery from '../../../images/cases-contacts/creditRecovery.png';
import business from '../../../images/cases-contacts/business.png';
import agribusiness from '../../../images/cases-contacts/agribusiness.png';
import criminal from '../../../images/cases-contacts/criminal.png';
import banker from '../../../images/cases-contacts/banker.png';
import contracts from '../../../images/cases-contacts/contracts.png';
import ecological from '../../../images/cases-contacts/ecological.png';
import sportive from '../../../images/cases-contacts/sportive.png';

import checked from '../../../images/icons/checked.svg';
import { useMediaQuery } from '../../hooks/useMediaQuery';

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
  { title: 'Previdenciário', icon: old },
  { title: 'Família e Sucessões', icon: family },
  { title: 'Tributário', icon: tributary },
  { title: 'Recuperação de crédito', icon: creditRecovery },
  { title: 'Empresarial', icon: business },
  { title: 'Agronegócio', icon: agribusiness },
  { title: 'Penal', icon: criminal },
  { title: 'Ambiental', icon: ecological },
  { title: 'Desportivo', icon: sportive },
  { title: 'Bancário', icon: banker },
  { title: 'Licitação e contratos', icon: contracts },
];

const maxSectors = 5;

export const CaseContact = () => {
  const { appEnvironment } = usePage().props;

  const [sectorIndex, setSectorIndex] = useState(null);
  const [currentStage, setCurrentStage] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [firstAccess, setFirstAccess] = useState(true);

  const isMobile = useMediaQuery('(max-width: 992px)');

  const { setData, data, post, processing, wasSuccessful, reset } = useForm({
    sector: '',
    typeEntityCase: '',
    typeEntityUser: '',
    nameCase: '',
    messageCase: '',
    nameUser: '',
    emailUser: '',
    phoneUser: '',
    attachFiles: [],
  });

  const sectionEl = useRef(null);

  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    maxSize: 2000000,
    onDropRejected() {
      toast.error('Por favor, insira um arquivo menor que 2MB.');
    },
    onDragEnter() {
      setDragging(true);
    },
    onDragLeave() {
      setDragging(false);
    },
    onDrop() {
      setDragging(false);
    },
  });

  const handleNextStep = () => setCurrentStage(currentStage + 1);

  useEffect(() => {
    setFirstAccess(false);
  }, []);

  useEffect(() => {
    if (sectorIndex !== null) {
      setData('sector', sectors[sectorIndex].title);

      if (isMobile) {
        sectionEl.current.scrollIntoView();
        setTimeout(handleNextStep, 300);
      }
    }
  }, [sectorIndex]);

  useEffect(() => {
    setData('attachFiles', acceptedFiles);
  }, [acceptedFiles]);

  useEffect(() => {
    if (currentStage > maxSectors) setCurrentStage(maxSectors);

    if (!firstAccess) sectionEl.current.scrollIntoView();
  }, [currentStage]);

  useEffect(() => {
    if (wasSuccessful) {
      handleNextStep();
      reset();
      setSectorIndex(null);
    }
  }, [wasSuccessful]);

  const handleSubmit = () => {
    post(route('case.contact'), {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <section ref={sectionEl} id="problems">
      <div className="container pt-4 pb-4">
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
                          <div className="row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 gapy-4 sector-area">
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
                                  <img
                                    src={imageHelper({
                                      path: icon,
                                      appEnvironment,
                                    })}
                                    alt={title}
                                  />
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
                            onClick={handleNextStep}
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
                                name="type-entity-case"
                                value="legal-person"
                                id="legal-person"
                                onChange={({ target: { value } }) =>
                                  setData('typeEntityCase', value)
                                }
                                checked={data.typeEntityCase === 'legal-person'}
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
                                name="type-entity-case"
                                value="individual-person"
                                id="individual-person"
                                onChange={({ target: { value } }) =>
                                  setData('typeEntityCase', value)
                                }
                                checked={
                                  data.typeEntityCase === 'individual-person'
                                }
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
                        {data.typeEntityCase && (
                          <>
                            <div>
                              <label htmlFor="name" className="form-label">
                                Nome
                                {data.typeEntityCase === 'legal-person' &&
                                  ' da empresa'}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder={`Nome${
                                  data.typeEntityCase === 'legal-person'
                                    ? ' da empresa'
                                    : ''
                                }`}
                                value={data.nameCase}
                                onChange={({ target: { value } }) =>
                                  setData('nameCase', value)
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
                                value={data.messageCase}
                                onChange={({ target: { value } }) =>
                                  setData('messageCase', value)
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className={`ms-auto btn-reset fw-bold d-flex flex-row align-items-center gapx-2 transition ${
                                data.nameCase && data.messageCase
                                  ? 'link-brand-second'
                                  : 'opacity-75 pe-none user-select-none'
                              }`.trim()}
                              onClick={handleNextStep}
                              disabled={!(data.nameCase && data.messageCase)}
                            >
                              Prosseguir <FaChevronRight />
                            </button>
                          </>
                        )}
                      </div>
                    );
                  case 3:
                    return (
                      <div className="d-flex flex-column gapy-4">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            Sobre o caso <FaCheck className="ms-2" />
                          </li>
                          <li className="breadcrumb-item active">
                            Documentos e arquivos
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            Suas informações
                          </li>
                        </ol>
                        <h2 className="fw-bold fz-24 text-blue-first m-0">
                          Documentos e arquivos{' '}
                          <small className="fw-regular fz-16">
                            (Não é obrigatório)
                          </small>
                        </h2>
                        <p className="text-gray-first">
                          Envie fotografias, pdfs, áudios e demais arquivos que
                          julgar importante para análise do caso.
                        </p>
                        <div className="p-4 border border-gray-fifth rounded">
                          <h3 className="fw-bold fz-16 text-blue-first mb-3">
                            Upload de arquivos
                          </h3>

                          <div className="row gapy-3">
                            {acceptedFiles.length > 0 && (
                              <div className="col-lg-5">
                                <div className="d-flex flex-column gapy-2">
                                  {acceptedFiles.map(({ name }) => (
                                    <div
                                      key={name.replaceAll(' ', '')}
                                      className="file-uploaded"
                                    >
                                      <FaRegFileAlt size={24} />
                                      <span>{name}</span>
                                      <img
                                        src={imageHelper({
                                          path: checked,
                                          appEnvironment,
                                        })}
                                        alt={name}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="col-lg">
                              <div
                                {...getRootProps({
                                  className: `cursor-pointer ${
                                    dragging ? 'dragging' : ''
                                  }`.trim(),
                                })}
                              >
                                <input {...getInputProps()} />
                                <div
                                  className={`py-awe-128 text-center border border-2 border-blue-first rounded user-select-none transition ${
                                    !dragging ? 'border-dashed' : ''
                                  }`.trim()}
                                >
                                  <FiFile
                                    className="text-blue-first"
                                    size={48}
                                  />
                                  <div className="d-flex flex-column align-items-center gapy-2 mt-4 text-gray-first">
                                    {dragging ? (
                                      <>
                                        <span>Solte os arquivos aqui!</span>
                                        <span>&nbsp;</span>
                                        <span>&nbsp;</span>
                                      </>
                                    ) : (
                                      <>
                                        <span>
                                          Arraste os arquivos até aqui
                                        </span>
                                        <span>ou</span>
                                        <span className="fw-bold text-blue-first ">
                                          Selecionar arquivos
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="link-brand-second ms-auto btn-reset fw-bold d-flex flex-row align-items-center gapx-2"
                          onClick={handleNextStep}
                        >
                          Prosseguir <FaChevronRight />
                        </button>
                      </div>
                    );
                  case 4:
                    return (
                      <div className="d-flex flex-column gapy-4">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item ">
                            Sobre o caso <FaCheck className="ms-2" />
                          </li>
                          <li className="breadcrumb-item">
                            Documentos e arquivos <FaCheck className="ms-2" />
                          </li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            Suas informações
                          </li>
                        </ol>
                        <h2 className="fw-bold fz-24 text-blue-first m-0">
                          Seus dados
                        </h2>
                        <div className="d-flex flex-column gapy-3">
                          <strong className="gray-first fw-bold">
                            Você é?
                          </strong>
                          <div className="d-flex flex-row flex-wrap gapx-4 gapy-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="type-entity-user"
                                value="legal-person"
                                id="legal-person"
                                onChange={({ target: { value } }) =>
                                  setData('typeEntityUser', value)
                                }
                                checked={data.typeEntityUser === 'legal-person'}
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
                                name="type-entity-user"
                                value="individual-person"
                                id="individual-person"
                                onChange={({ target: { value } }) =>
                                  setData('typeEntityUser', value)
                                }
                                checked={
                                  data.typeEntityUser === 'individual-person'
                                }
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
                        {data.typeEntityUser && (
                          <>
                            <div>
                              <label htmlFor="name" className="form-label">
                                Nome
                                {data.typeEntityUser === 'legal-person' &&
                                  ' da empresa'}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder={`Nome${
                                  data.typeEntityUser === 'legal-person'
                                    ? ' da empresa'
                                    : ''
                                }`}
                                value={data.nameUser}
                                onChange={({ target: { value } }) =>
                                  setData('nameUser', value)
                                }
                              />
                            </div>
                            <div className="row">
                              <div className="col-8">
                                <div>
                                  <label htmlFor="email" className="form-label">
                                    E-mail
                                    {data.typeEntityUser === 'legal-person' &&
                                      ' da empresa'}
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="email@email.com"
                                    value={data.emailUser}
                                    onChange={({ target: { value } }) =>
                                      setData('emailUser', value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-4">
                                <div>
                                  <label htmlFor="phone" className="form-label">
                                    Celular
                                    {data.typeEntityUser === 'legal-person' &&
                                      ' da empresa'}
                                  </label>
                                  <IMaskInput
                                    mask="(00) 0 0000-0000"
                                    className="form-control"
                                    placeholder="(00) 0 0000-0000"
                                    id="phone"
                                    value={data.phoneUser}
                                    onAccept={(value) =>
                                      setData('phoneUser', value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="btn btn-brand-second text-white ms-auto fw-bold"
                              onClick={handleSubmit}
                              disabled={processing}
                            >
                              Enviar informações do caso
                            </button>
                          </>
                        )}
                      </div>
                    );
                  case 5:
                    return (
                      <div className="py-awe-128 text-center">
                        <div className="row justify-content-center flex-column align-items-center gapy-4">
                          <div className="col-auto">
                            <h2 className="fw-bold fz-24 text-blue-first m-0">
                              Concluído!
                            </h2>
                          </div>
                          <div className="col-10">
                            <p className="m-0 text-gray-first">
                              Suas informações foram enviadas com sucesso e
                              agora entrarão no processo de análise pelo
                              advogado para que em até 72h você receba um
                              retorno, explicando como você pode prosseguir com
                              o caso.
                            </p>
                          </div>
                          <div className="col-md-6 col-lg-5 col-xl-4">
                            <button
                              type="button"
                              className="btn btn-outline-brand-second text-white-hover text-brand-second w-100 fw-bold"
                              onClick={() => setCurrentStage(1)}
                            >
                              Fechar
                            </button>
                          </div>
                        </div>
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
