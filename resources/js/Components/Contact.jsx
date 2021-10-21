export const Contact = () => (
  <section>
    <div className="container py-awe-96">
      <div className="row justify-content-center">
        <div className="col-md-11 col-lg-10">
          <div className="d-flex flex-column gapy-4">
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
                      className="form-control"
                      id="name"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="email@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="form-label">
                      Assunto
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Assunto"
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
                    className="form-control flex-grow-1"
                    id="message"
                    rows="3"
                    placeholder="Digite a sua mensagem"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-blue-first ms-auto fw-bold px-awe-64"
            >
              Enviar mensagem
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
