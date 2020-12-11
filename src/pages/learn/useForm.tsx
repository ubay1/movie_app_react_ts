import React from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = React.useState(initialValues);

  return [
    values,
    (e: any) => {
      setValues({...values, [e.target.name]: e.target.value });
    }
  ]
}