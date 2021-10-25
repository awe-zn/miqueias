export default ({ appEnvironment, path }) =>
  `${appEnvironment !== 'local' ? '/public' : ''}${path}`;
