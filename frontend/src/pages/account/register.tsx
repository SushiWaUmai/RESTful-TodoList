import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import InputFieldComponent from "../../components/InputFieldComponent";
import { toErrorMap } from "../../utils/ToErrorMap";
import ButtonComponent from "../../components/ButtonComponent";
import { UserRegisterInput, UserResponse } from "@shared/SharedTypes";
import { UserContext } from "../../components/LayoutComponent";

// TODO: figure out how to import with alias
// import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "@shared/Constants";
// import { IsEmail } from "@shared/utils/CheckEmail";
import {
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "../../../../shared/src/Constants";
import { IsEmail } from "../../../../shared/src/utils/CheckEmail";

type OptionalUsernamePasswordRepeatInput = Partial<UsernamePasswordRepeatInput>;

type UsernamePasswordRepeatInput = UserRegisterInput & {
  repeatPassword: string;
};
export default function RegisterPage() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (
    values: UsernamePasswordRepeatInput,
    { setErrors, setSubmitting }: FormikHelpers<UsernamePasswordRepeatInput>
  ) => {
    let data: UserResponse = await (
      await axios.post("http://localhost:4000/user/register", values, {
        withCredentials: true,
      })
    )?.data;
    if (data?.error) {
      setErrors(toErrorMap(data.error));
    } else {
      setSubmitting(false);
      router.push("/account/dashboard");

      setUser(data.user);
    }
  };

  const handleValidate = (values: UsernamePasswordRepeatInput) => {
    const { username, email, password, repeatPassword } = values;
    let result: OptionalUsernamePasswordRepeatInput = {};
    if (username.length < MIN_USERNAME_LENGTH) {
      result.username = `Username must be at least ${MIN_USERNAME_LENGTH} characters long`;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      result.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
    }
    if (repeatPassword !== "" && password !== repeatPassword) {
      result.repeatPassword = "Passwords do not match";
    }
    if (!IsEmail(email)) {
      result.email = "Enter an E-Mail adress";
    }
    return result;
  };

  const initialValues: UsernamePasswordRepeatInput = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  return (
    <div className="container mx-auto px-4">
      <div className="my-5">
        <h1 className="text-5xl">Register</h1>
        <hr />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={false}
        validate={handleValidate}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputFieldComponent
              fieldProps={{
                type: "text",
                name: "username",
                placeholder: "Username",
                className: "inputfield",
              }}
              divProps={{ className: "my-5" }}
              label="Username"
            />
            <InputFieldComponent
              fieldProps={{
                type: "email",
                name: "email",
                placeholder: "E-Mail",
                className: "inputfield",
              }}
              divProps={{ className: "my-5" }}
              label="E-Mail"
            />
            <InputFieldComponent
              fieldProps={{
                type: "password",
                name: "password",
                placeholder: "Password",
                className: "inputfield",
              }}
              divProps={{ className: "my-5" }}
              label="Password"
            />
            <InputFieldComponent
              fieldProps={{
                type: "password",
                name: "repeatPassword",
                placeholder: "Repeat Password",
                className: "inputfield",
              }}
              divProps={{ className: "my-5" }}
              label="Repeat Password"
            />
            <ButtonComponent
              className="p-3 bg-gradient-to-br from-yellow-400 to-red-500 rounded"
              type="submit"
              disabled={isSubmitting}
            >
              Create Account
            </ButtonComponent>
          </Form>
        )}
      </Formik>
    </div>
  );
}
