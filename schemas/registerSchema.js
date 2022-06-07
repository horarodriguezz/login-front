import { object, string, boolean } from "yup";

export const registerSchema = object().shape({
  firstName: string().required("Please enter your name."),
  lastName: string().required("Please enter your last name"),
  email: string()
    .required("Please enter an email.")
    .email("Please enter a valid email."),
  password: string()
    .required("Please enter a password.")
    .min(8, "Password is too short.")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(
      /^(?=.*[!@#%&])/,
      "Must contain at least one special character e.g. ! @ # % &"
    ),
});
