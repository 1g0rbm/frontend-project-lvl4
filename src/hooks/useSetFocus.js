export default (ref) => {
  const setFocusOn = (focusOn) => ref?.current[focusOn]?.focus();

  const handleFormikForm = (values, errors, isSubmitting) => {
    if (isSubmitting) {
      return;
    }

    const [firstEmptyField] = Object.keys(values).filter((key) => !values[key]);
    if (firstEmptyField) {
      setFocusOn(firstEmptyField);
      return;
    }

    const [firstErrorField] = Object.keys(values).filter((key) => !!errors[key]);
    if (firstErrorField) {
      setFocusOn(firstErrorField);
    }
  };

  return { setFocusOn, handleFormikForm };
};
