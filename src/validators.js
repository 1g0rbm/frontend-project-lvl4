import * as yup from 'yup';

export default {
  loginForm: yup.object({
    username: yup.string()
      .trim()
      .required('error.requred'),
    password: yup.string()
      .required('error.requred'),
  }),
  signupForm: yup.object({
    username: yup.string()
      .trim()
      .min(3, 'error.lengthMinUsername')
      .max(20, 'error.lengthMaxUsername')
      .required('error.requred'),
    password: yup.string()
      .min(6, 'error.lengthMinPassword')
      .required('error.requred'),
    passwordConfirmation: yup.string()
      .min(6, 'error.lengthMinPassword')
      .required('error.requred')
      .oneOf([yup.ref('password'), null], 'error.mustMatchPassword'),
  }),
  addChannelForm: (existedChannels) => (
    yup.object({
      name: yup.string()
        .trim()
        .min(3, 'error.lengthMinChannel')
        .max(20, 'error.lengthMaxChannel')
        .required('error.requred')
        .notOneOf(existedChannels, 'error.alreadyHas')
        .matches(/^[a-z0-9-_\s]+$/, 'error.onlyLettersAndDigit'),
    })
  ),
};
