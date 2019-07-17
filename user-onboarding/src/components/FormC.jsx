import React from "react";
import PropTypes from "prop-types";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

export function FormC({ handleChange, values, errors, touched, isSubmitting }) {
  return (
    <div>
      <Form>
        <Field name="name" placeholder="name" onChange={handleChange} />
        <Field name="email" placeholder="email" onChange={handleChange} />
        <Field name="password" placeholder="password" onChange={handleChange} />
        Terms Of Service
        <Field
          name="tos"
          type="checkbox"
          checked={values.tos}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        {isSubmitting && <p>Submitting..</p>}
      </Form>
    </div>
  );
}

FormC.propTypes = {};

export default withFormik({
  // makin props
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
    };
  },
  // validation
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    // make this required 1 symbol and 1 uppercase later
    password: Yup.string()
      .min(1, "Password must be more than 1 character")
      .required("Password is required"),
    // user needs to tick the checkbox
    // checkbox: Yup.boolean().required("Terms of Service must be accepted"),
  }),
  handleSubmit(values, formikBag) {
    const url = "https://reqres.in/api/users";
    formikBag.setSubmitting(true);
    axios.post(url, values).then(response => {
      console.log(response);
      window.alert(`Post success! Welcome ${response.data.name} !`);
      formikBag.setSubmitting(false);
    });
  },
})(FormC);
