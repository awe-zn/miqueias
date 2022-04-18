@extends('layouts.mail')

@section('content')
    <div style="background-color: rgba(9, 44, 76, 0.9); color: white;">
        <div
            style="max-width: 500px; margin: auto; text-align: center; padding: 64px 32px 128px;">
            <img src="{{ asset(env('APP_ENV') !== 'production' ? 'images/logo-white.png' : 'public/images/logo-white.png') }}"
                alt="Logo" style="width: 350px; max-width: 100%; min-height: auto;">
            <h1
                style="text-align: left; margin: 64px 0; font-weight: 400; font-size: 40px; line-height: 1.25;">
                <strong>{{ $name }}</strong>
                acaba de solicitar um novo processo de recupreação de senha.
            </h1>
            <p style="text-align: left; margin: 0; font-size: 18px;">
                Uma solicitação de nova senha foi solicitada, se não foi você,
                desconsidere essa mensagem.
            </p>
        </div>
    </div>
    <div style="max-width: 750px; margin: auto; padding: 48px 24px 64px;">
        <p style="color: #4F4F4F; margin-bottom: 40px; text-align: center;">Para
            acessar e recuperar sua
            senha, clique no link abaixo!</p>
        <a href={{ $url }}
            style="background-color: #2d6280; font-size: 16px; padding: 0.5em 1em; display: block; text-decoration: none; color: white; text-align: center; border-radius: 4px; max-width: 200px; margin: auto;">Recuperar
            Senha</a>
    </div>
@endsection
