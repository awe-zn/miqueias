export const Question = () => (
  <section>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-11 col-lg-10">
          <div className="bg-gray-third p-4 p-md-awe-32 rounded">
            <h1 className="text-blue-first fz-24 fw-bold mb-4">
              Perguntas frequentes
            </h1>

            <div className="accordion" id="accordion-questions">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-1"
                  >
                    Título da pergunta #1
                  </button>
                </h2>
                <div
                  id="question-1"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p className="m-0">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. make up the bulk
                      of the card's content. Some quick example text to build on
                      the card title and make up the bulk of the card's content.
                      make up the bulk of the card's content. Some quick example
                      text to build on the card title and make up the bulk of
                      the card's content. make up the bulk of the card's
                      content.Some quick example text to build on
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-2"
                  >
                    Título da pergunta #2
                  </button>
                </h2>
                <div
                  id="question-2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p className="m-0">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. make up the bulk
                      of the card's content. Some quick example text to build on
                      the card title and make up the bulk of the card's content.
                      make up the bulk of the card's content. Some quick example
                      text to build on the card title and make up the bulk of
                      the card's content. make up the bulk of the card's
                      content.Some quick example text to build on
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#question-3"
                  >
                    Título da pergunta #3
                  </button>
                </h2>
                <div
                  id="question-3"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p className="m-0">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. make up the bulk
                      of the card's content. Some quick example text to build on
                      the card title and make up the bulk of the card's content.
                      make up the bulk of the card's content. Some quick example
                      text to build on the card title and make up the bulk of
                      the card's content. make up the bulk of the card's
                      content.Some quick example text to build on
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
