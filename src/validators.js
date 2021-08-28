import * as yup from 'yup';

export default {
  loginForm: yup.object({
    username: yup.string().trim().required(),
    password: yup.string().required(),
  }),
};
