import React from "react";
import PropTypes from "prop-types";
import { withFormik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import axios from "axios";
import * as Yup from "yup";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    maxWidth: "1000px",
    margin: "0 auto",
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    margin: "0 5px",
  },
  terms: {
    marginRight: "5px",
  },
  left: {
    marginLeft: "5px",
  },
}));
export function FormC({ handleChange, values, errors, touched, isSubmitting }) {
  const classes = useStyles();
  return (
    <div>
      <Form className={classes.container}>
        <Field
          name="name"
          placeholder="name"
          onChange={handleChange}
          autoComplete="off"
          component={TextField}
          className={classes.textField}
        />
        <Field
          name="email"
          placeholder="email"
          onChange={handleChange}
          autoComplete="off"
          component={TextField}
          className={classes.textField}
        />
        <Field
          name="password"
          placeholder="password"
          onChange={handleChange}
          autoComplete="off"
          component={TextField}
          className={classes.textField}
          type="password"
        />
        <div className={classes.terms}>Terms & Conditions</div>
        <Field
          name="tos"
          checked={values.tos}
          onChange={handleChange}
          autoComplete="off"
          component={CheckboxWithLabel}
          color="primary"
          label="TOS"
        />
        <Button variant="outlined" type="submit" disabled={isSubmitting}>
          Submit &rarr;
        </Button>
        {isSubmitting && <p className={classes.left}>Submitting..</p>}
      </Form>
    </div>
  );
}

FormC.propTypes = {
  handleChange: PropTypes.func,
  values: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    tos: PropTypes.bool,
  }),
  errors: PropTypes.object,
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
};

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
      .required("Password is required")
      .matches(/[a-zA-Z]/, "Password can only contain letters"),
    // user needs to tick the checkbox
    // checkbox: Yup.boolean().required("Terms of Service must be accepted"),
    tos: Yup.boolean().oneOf([true], "Must accept terms of service"),
  }),
  handleSubmit(values, formikBag) {
    formikBag.resetForm();
    const url = "https://reqres.in/api/users";
    formikBag.setSubmitting(true);
    axios.post(url, values).then(response => {
      console.log(response);
      window.alert(`Post success! Welcome ${response.data.name}`);
      formikBag.setSubmitting(false);
    });
  },
})(FormC);
