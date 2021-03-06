import { UserLoginInput, UserResponse } from "@shared/SharedTypes";
import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent, useContext } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import InputFieldComponent from "../../components/InputFieldComponent";
import { UserContext } from "../../components/LayoutComponent";
import { BACKEND_URI } from "../../utils/Constants";
import { toErrorMap } from "../../utils/ToErrorMap";
import Head from "next/head";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (
    values: UserLoginInput,
    { setErrors, setSubmitting }: FormikHelpers<UserLoginInput>
  ) => {
    let data: UserResponse = await (
      await axios.post(`${BACKEND_URI}/user/login`, values, {
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

  const initialValues: UserLoginInput = {
    usernameOrEmail: "",
    password: "",
  };

  return (
    <>
      <Head>
        <title>Log in | RESTful Todolist</title>
      </Head>
      <div className="container mx-auto px-4">
        <div className="my-5">
          <h1 className="text-5xl">Login</h1>
          <hr />
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <InputFieldComponent
                fieldProps={{
                  type: "text",
                  name: "usernameOrEmail",
                  placeholder: "Username or Email",
                  className: "inputfield",
                }}
                divProps={{ className: "my-5" }}
                label="Username or Email"
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
              <ButtonComponent
                className="p-3 bg-gradient-to-br from-yellow-400 to-red-500 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Log in
              </ButtonComponent>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;
