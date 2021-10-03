import InputFieldComponent from "../../components/InputFieldComponent";
import { MIN_PASSWORD_LENGTH } from "../../../../shared/src/Constants";
import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { toErrorMap } from "../../utils/ToErrorMap";
import ButtonComponent from "../../components/ButtonComponent";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { ChangePasswordInput } from "@shared/SharedTypes";

interface ForgotPasswordPageProps {}
interface PasswordInput {
  newPassword: string;
  repeatNewPassword: string;
}
type OptionalPasswordInput = Partial<PasswordInput>;

const ForgotPasswordPage: FunctionComponent<ForgotPasswordPageProps> = () => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [uuid, setUUID] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    let query = router.query;
    setUUID(query.uuid as string);
  }, [router]);

  const handleChangePassword = async (
    val: PasswordInput,
    { setErrors }: FormikHelpers<PasswordInput>
  ) => {
    if (!uuid) return;

    let reqBody: ChangePasswordInput = {
      newPassword: val.newPassword,
      uuid,
    };

    let data = await (
      await axios.post("http://localhost:4000/user/changePassword", reqBody, {
        withCredentials: true,
      })
    )?.data;

    if (!data?.error) {
      setPasswordChanged(true);
    }
  };

  const handleValidate = ({
    newPassword,
    repeatNewPassword,
  }: PasswordInput) => {
    let result: OptionalPasswordInput = {};

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      result.newPassword = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
    }
    if (newPassword !== repeatNewPassword) {
      result.repeatNewPassword = "Passwords do not match";
    }

    return result;
  };

  let initialValues: PasswordInput = {
    newPassword: "",
    repeatNewPassword: "",
  };

  return (
    <div className="container mx-auto px-4">
      <div className="my-5">
        <h1 className="text-5xl">Reset Password</h1>
        <hr />
      </div>
      {!passwordChanged ? (
        <Formik
          initialValues={initialValues}
          validate={handleValidate}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={handleChangePassword}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputFieldComponent
                fieldProps={{
                  type: "password",
                  name: "newPassword",
                  placeholder: "New password",
                  className: "inputfield",
                }}
                divProps={{ className: "my-5" }}
                label="New password"
              />
              <InputFieldComponent
                fieldProps={{
                  type: "password",
                  name: "repeatNewPassword",
                  placeholder: "Repeat new password",
                  className: "inputfield",
                }}
                divProps={{ className: "my-5" }}
                label="Repeat new password"
              />

              <ButtonComponent
                className="p-3 bg-gradient-to-br from-yellow-400 to-red-500 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Reset Password
              </ButtonComponent>
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <p>Your Passoword has been reset</p>
          <ButtonComponent className="p-3 bg-gradient-to-br from-yellow-400 to-red-500 rounded">
            <Link href="/account/dashboard">Back to Dashboard</Link>
          </ButtonComponent>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
