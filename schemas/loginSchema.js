import { object, string } from "yup";

export const loginSchema = object().shape({
  email: string()
    .required("Please enter an email.")
    .email("Please enter a valid email."),
  password: string()
    .required("Please enter a password.")
    .min(8, "Password is too short."),
});
