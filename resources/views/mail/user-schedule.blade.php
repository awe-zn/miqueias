@extends('layouts.mail')

@section('content')
  <div style="background-color: rgba(9, 44, 76, 0.9); color: white;">
    <div
      style="max-width: 500px; margin: auto; text-align: center; padding: 64px 32px 128px;">
      <img
        src="{{ asset(env('APP_ENV') !== 'production' ? 'images/logo-white.png' : 'public/images/logo-white.png') }}"
        alt="Logo" style="width: 350px; max-width: 100%; min-height: auto;">
      <h1
        style="text-align: left; margin: 64px 0; font-weight: 400; font-size: 40px; line-height: 1.25;">
        <strong>{{ $user->name }}</strong>, veja sua <span
          style="color: #DF8877;">agenda</span> de hoje.
      </h1>
    </div>
  </div>
  <div style="max-width: 750px; margin: auto; padding: 48px 24px 64px;">
    <p style="color: #4F4F4F; margin-bottom: 40px">Confira abaixo suas tarefas e
      eventos para hoje!</p>
    <div
      style="padding: 32px; background-color: #F2F2F2; border-radius: 8px; margin-bottom: 24px;">
      @forelse ($user->tasks as $event)
        <div>aaaaaaaaaaa</div>
      @empty
        <div>NADINHA</div>
      @endforelse
    </div>
  </div>
@endsection
