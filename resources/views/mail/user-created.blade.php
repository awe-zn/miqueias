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
        <div><strong>{{ $name }}</strong>,</div>
        seja bem-vindo(a) ao REVOJUS!
      </h1>
      <div style="text-align: left; margin: 0; font-size: 18px;">
        <p>
          Sua conta foi criada com sucesso!
        </p>
        <p>
          Agora será possível acessar o sistema com sua senha temporaria logo
          abaixo.
        </p>
      </div>
    </div>
  </div>
  <div style="max-width: 750px; margin: auto; padding: 48px 24px 64px;">
    <div
      style="padding: 32px; background-color: #F2F2F2; border-radius: 8px; margin-bottom: 24px; text-align: center;">
      {{ $password }}
    </div>
    <p style="color: #4F4F4F; margin-bottom: 40px; text-align: center;">
      Para acessar e definir sua nova senha, clique no link abaixo.
    </p>
    <a href={{ route('login') }}
      style="background-color: #2d6280; font-size: 16px; padding: 0.5em 1em; display: block; text-decoration: none; color: white; text-align: center; border-radius: 4px; max-width: 200px; margin: auto;">
      Entrar agora!
    </a>
  </div>
@endsection
