export const Question = () => (
  <section id="question">
    <div className="container pt-4">
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
                    Quem somos?
                  </button>
                </h2>
                <div
                  id="question-1"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p className="m-0">
                      Por enquanto somos uma sociedade individual de advocacia,
                      composto por estagiários (as) mega competentes e por um
                      advogado (Dr.Miquéias Costa – OAB/RN 18.861), bem
                      energético e espontâneo, e desenvolvemos uma ferramenta
                      prática para que você possa fazer valer os seus direitos
                      de onde estiver.
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
                    Como funciona a ferramenta?
                  </button>
                </h2>
                <div
                  id="question-2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p className="m-0">
                      Acesse o nosso sistema pelo browser do seu smartphone ou
                      computador, dedique 5 minutos para responder a um
                      questionário simples e recolher as provas necessárias, e
                      receba em poucos dias a data e o horário das informações
                      acerca do seu processo.
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
                    Quanto custa para utilizar a ferramenta?
                  </button>
                </h2>
                <div
                  id="question-3"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p>Nada.</p>
                    <p>
                      Você também não precisa pagar taxas para dar início à sua
                      ação judicial, caso tramite em um Juizado Especial Cível.
                    </p>
                    <p className="m-0">
                      Caso queira conhecer a nossa proposta de honorários
                      advocatícios para o seu caso específico, entre em contato
                      conosco.
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
                    data-bs-target="#question-4"
                  >
                    E se eu perder a ação judicial?
                  </button>
                </h2>
                <div
                  id="question-4"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p className="m-0">
                      A princípio, você não precisará pagar nada se perder uma
                      ação judicial em um Juizado Especial Cível, a não ser que
                      você seja declarado litigante de má-fé pelo juiz.
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
                    data-bs-target="#question-5"
                  >
                    Qual será o valor da minha indenização?
                  </button>
                </h2>
                <div
                  id="question-5"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p>
                      Infelizmente, não é possível prever o valor da sua
                      indenização, pois ele poderá variar de acordo com as
                      particularidades de cada caso e com o entendimento
                      específico do Poder Judiciário da sua região.
                    </p>
                    <p className="m-0">
                      Caso você decida nos contratar, com mais informações sobre
                      o seu caso podemos apresentar uma estimativa para o valor
                      da sua indenização com base na nossa experiência
                      profissional.
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
                    data-bs-target="#question-6"
                  >
                    Quanto tempo precisarei esperar para receber a minha
                    indenização?
                  </button>
                </h2>
                <div
                  id="question-6"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p>
                      A duração de uma ação judicial também varia bastante,
                      conforme a complexidade do caso e o volume de trabalho do
                      juízo.
                    </p>
                    <p>
                      O Conselho Nacional de Justiça nos informa que a duração
                      média de ações judiciais é de 2 anos e 3 meses, porém a
                      nossa experiência sugere um tempo bem mais curto.
                    </p>
                    <p className="m-0">
                      Caso tenhamos sucesso em negociar um acordo para o seu
                      caso, você poderá receber a sua indenização em uma questão
                      de poucos meses.
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
                    data-bs-target="#question-7"
                  >
                    O que eu preciso fazer durante o processo?
                  </button>
                </h2>
                <div
                  id="question-7"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p>
                      Vamos precisar que você compareça a uma ou no máximo duas
                      audiências designadas pelo juiz, mantenha o seu endereço
                      atualizado em nossa base de dados e nos informe com
                      antecedência sobre eventual impossibilidade de comparecer
                      no dia e horário marcados para qualquer das audiências.
                    </p>
                    <p className="m-0">
                      E não se preocupe, pois lhe manteremos informado sobre
                      todas estas datas importantes e explicaremos em detalhe no
                      momento certo como você poderá se preparar para cada uma
                      das audiências.
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
                    data-bs-target="#question-8"
                  >
                    Como eu receberei a minha indenização?
                  </button>
                </h2>
                <div
                  id="question-8"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p>É muito simples.</p>
                    <p className="m-0">
                      Você receberá a sua indenização na conta corrente que vier
                      a nos informar no momento oportuno, já devidamente
                      deduzida dos nossos honorários advocatícios.
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
                    data-bs-target="#question-9"
                  >
                    Como será a nossa atuação como seu advogado?
                  </button>
                </h2>
                <div
                  id="question-9"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p>
                      Trabalhamos em todos os âmbitos da Justiça, possuímos
                      profissionais capacitados para desempenhar com maestria o
                      ofício.
                    </p>
                    <p className="m-0">
                      Faremos todo o trabalho técnico, distribuiremos a sua ação
                      judicial na Vara mais próxima de você, buscaremos um
                      acordo extrajudicial justo para o seu caso, acompanharemos
                      o seu processo até que tenhamos uma sentença e
                      responderemos a qualquer recurso que venha a ser
                      apresentado.
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
                    data-bs-target="#question-10"
                  >
                    Quais são os limites da nossa atuação?
                  </button>
                </h2>
                <div
                  id="question-10"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p>
                      Como realizaremos todo o trabalho remotamente, não lhe
                      acompanharemos na audiência de conciliação (mas não se
                      preocupe, vamos lhe ajudar a se preparar adequadamente com
                      bastante tempo de antecedência para que você possa
                      esclarecer todas as suas dúvidas).
                    </p>
                    <p>
                      Se o seu caso exigir uma segunda audiência (audiência de
                      instrução e julgamento), você estará acompanhado de um dos
                      nossos advogados, sem qualquer custo adicional.
                    </p>
                    <p className="m-0">
                      Também não apresentaremos recurso em seu nome com o qual
                      não concordamos ou que possa gerar qualquer tipo de custo
                      para você. Caso o juiz decida contra você e você queira
                      recorrer da sentença contra a nossa recomendação, será
                      necessário contratar outro advogado (e, mais uma vez, não
                      se preocupe, pois até com isso nós podemos lhe ajudar).
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
                    data-bs-target="#question-11"
                  >
                    Ainda tem alguma dúvida?
                  </button>
                </h2>
                <div
                  id="question-11"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion-questions"
                >
                  <div className="accordion-body">
                    <p className="m-0">
                      Entre em contato conosco e lhe atenderemos em breve!
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
