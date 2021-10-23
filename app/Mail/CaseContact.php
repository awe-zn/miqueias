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
    $mail = $this->view('mail.case', ['contact' => $this->input]);

    foreach ($this->input->attachFiles as $file) {
      $mail->attach($file, [
        'as' => $file->getClientOriginalName(),
        'mime' => $file->getMimeType(),
      ]);
    }

    return $mail;
  }
}
