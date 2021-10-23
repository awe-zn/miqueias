<ul>
  <li>
    Setor: <strong>{{ $contact->sector }}</strong>
  </li>
  <li>
    Quem você quer processar? <strong>{{ $contact->typeEntityCase }}</strong>
  </li>
  <li>
    Nome de quem está sendo processado:
    <strong>{{ $contact->nameCase }}</strong>
  </li>
  <li>
    Detalhamento do caso: <strong>{{ $contact->messageCase }}</strong>
  </li>
  <li>
    Quem está processando? <strong>{{ $contact->typeEntityUser }}</strong>
  </li>
  <li>
    Nome do cliente: <strong>{{ $contact->nameUser }}</strong>
  </li>
  <li>
    E-mail do cliente: <strong>{{ $contact->emailUser }}</strong>
  </li>
  <li>
    Telefone do cliente: <strong>{{ $contact->phoneUser }}</strong>
  </li>
</ul>
