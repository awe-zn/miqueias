<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CaseContact extends Mailable
{
  use Queueable, SerializesModels;

  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct($input)
  {
    $this->input = $input;
  }

  /**
   * Build the message.
   *
   * @return $this
   */
  public function build()
  {
    $hasAttachs = false;
    if (property_exists($this->input, 'attachFiles')) {
      $hasAttachs = $this->input->attachFiles ? true : false;
    }

    $this->input->hasAttachs = $hasAttachs;

    $mail = $this->view('mail.case', ['contact' => $this->input])->subject('Interesse em novo processo!');

    if (property_exists($this->input, 'attachFiles')) {
      foreach ($this->input->attachFiles as $file) {
        $mail->attach($file, [
          'as' => $file->getClientOriginalName(),
          'mime' => $file->getMimeType(),
        ]);
      }
    }

    return $mail;
  }
}
