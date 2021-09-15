console.log('TOKEN: ', process.env.ROLLBAR_TOKEN);
console.log('NODE_ENV: ', process.env.NODE_ENV);
console.log('ENV: ', process.env);

const config = {
  enabled: process.env.NODE_ENV === 'production',
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: '0.0.1',
        guess_uncaught_frames: true,
      },
    },
  },
};

export default config;
