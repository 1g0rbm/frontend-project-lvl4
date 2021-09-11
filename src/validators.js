import * as yup from 'yup';

export default {
  loginForm: yup.object({
    username: yup.string().trim().required(),
    password: yup.string().required(),
  }),
  signupForm: yup.object({
    username: yup.string()
      .trim()
      .min(3)
      .max(20)
      .required(),
    password: yup.string().min(6).required(),
    passwordConfirmation: yup.string()
      .min(6)
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  }),
  addChannelForm: (existedChannels) => (
    yup.object({
      name: yup.string()
        .trim()
        .min(3)
        .max(20)
        .required()
        .notOneOf(existedChannels)
        .matches(/^[a-z0-9-_]+$/),
    })
  ),
};
