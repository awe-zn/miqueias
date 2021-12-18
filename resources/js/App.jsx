/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { ToastContainer } from 'react-toastify';
import { InertiaProgress } from '@inertiajs/progress';

import 'react-toastify/dist/ReactToastify.min.css';

createInertiaApp({
  resolve: (name) => require(`./pages/${name}`),
  setup({ el, App, props }) {
    render(
      <>
        <App {...props} />
        <ToastContainer />
      </>,
      el
    );
  },
});

InertiaProgress.init();
