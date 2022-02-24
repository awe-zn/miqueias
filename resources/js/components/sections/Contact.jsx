import { useForm } from '@inertiajs/inertia-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const Contact = () => {
  const [wasTried, setWasTried] = useState(false);
  const { post, data, setData, processing, errors, wasSuccessful, reset } =
    useForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('contact'), {
      preserveScroll: true,
    });

    if (!wasTried) setWasTried(true);
  };

  useEffect(() => {
    if (wasSuccessful) {
      reset();
      setWasTried(false);

      toast.success('Solicitação de contato realizada com sucesso!');

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [wasSuccessful]);

  return (
    <section>
      <div className="container py-awe-96">
        <div className="row justify-content-center">
          <div className="col-md-11 col-lg-10">
            <form className="d-flex flex-column gapy-4" onSubmit={handleSubmit}>
              <h1 className="text-blue-first fw-bold fz-24 m-0">Contato</h1>
              <div className="row gapy-3">
                <div className="col-lg">
                  <div className="d-flex flex-column gapy-3">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Nome
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name
                            ? 'is-invalid'
                            : (wasTried && !processing && 'is-valid') || ''
                        }`.trim()}
                        id="name"
                        placeholder="Seu nome"
                        value={data.name}
                        onChange={({ target: { value } }) =>
                          setData('name', value)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email
                            ? 'is-invalid'
                            : (wasTried && !processing && 'is-valid') || ''
                        }`.trim()}
                        id="email"
                        placeholder="email@email.com"
                        value={data.email}
                        onChange={({ target: { value } }) =>
                          setData('email', value)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="form-label">
                        Assunto
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.subject
                            ? 'is-invalid'
                            : (wasTried && !processing && 'is-valid') || ''
                        }`.trim()}
                        id="subject"
                        placeholder="Assunto"
                        value={data.subject}
                        onChange={({ target: { value } }) =>
                          setData('subject', value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg">
                  <div className="h-100 d-flex flex-column">
                    <label htmlFor="message" className="form-label">
                      Mensagem
                    </label>
                    <textarea
                      className={`form-control flex-grow-1 ${
                        errors.message
                          ? 'is-invalid'
                          : (wasTried && !processing && 'is-valid') || ''
                      }`.trim()}
                      id="message"
                      rows="3"
                      placeholder="Digite a sua mensagem"
                      value={data.message}
                      onChange={({ target: { value } }) =>
                        setData('message', value)
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-blue-first ms-auto fw-bold px-awe-64"
                disabled={processing}
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
