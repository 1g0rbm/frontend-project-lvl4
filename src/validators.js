import * as yup from 'yup';

export default {
  loginForm: yup.object({
    username: yup.string().trim().required(),
    password: yup.string().required(),
  }),
  addChannelForm: (existedChannels) => (
    yup.object({
      name: yup.string()
        .trim()
        .required()
        .notOneOf(existedChannels)
        .matches(/^[a-z0-9-_]+$/),
    })
  ),
};
