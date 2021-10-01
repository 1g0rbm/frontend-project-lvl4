import * as yup from 'yup';

export default {
  addChannelForm: (existedChannels) => (
    yup.object({
      name: yup.string()
        .trim()
        .min(3, 'error.lengthMinChannel')
        .max(20, 'error.lengthMaxChannel')
        .required('error.requred')
        .notOneOf(existedChannels, 'error.alreadyHas')
        .matches(/^[a-zA-Z0-9-_\s]+$/, 'error.onlyLettersAndDigit'),
    })
  ),
};
