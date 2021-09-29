import { GenericResponse, UserDeleteInput } from "@shared/SharedTypes";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent, useContext } from "react";
import { ModalAttributes } from "../../hooks/useModal";
import ButtonComponent from "../ButtonComponent";
import InputFieldComponent from "../InputFieldComponent";
import { UserContext } from "../LayoutComponent";
import ModalComponent from "../ModalComponent";

interface DeleteModalProps {
  deleteModal: ModalAttributes;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ deleteModal }) => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (val: { password: string }) => {
    console.log(user);
    if (!user) return;

    const reqBody: UserDeleteInput = {
      username: user.username,
      password: val.password,
    };

    let data: GenericResponse = await (
      await axios.post("http://localhost:4000/user/delete", reqBody, {
        withCredentials: true,
      })
    )?.data;

    if (!data?.error) {
      setUser(undefined);
      router.push("/");
    } else {
      console.log("Error", data);
    }
  };

  return (
    <ModalComponent
      modalTitle="Delete Account?"
      handleClose={deleteModal.close}
      modalOpen={deleteModal.isOpen}
    >
      <Formik onSubmit={handleSubmit} initialValues={{ password: "" }}>
        <Form>
          <InputFieldComponent
            fieldProps={{
              className: "inputfield w-full",
              name: "password",
              placeholder: "Password",
              type: "password",
            }}
            divProps={{ className: "my-5" }}
            label="Password"
          />
          <div className="flex justify-end">
            <ButtonComponent
              className="my-5 p-3 block bg-red-500 rounded"
              type="submit"
            >
              Delete
            </ButtonComponent>
          </div>
        </Form>
      </Formik>
    </ModalComponent>
  );
};

export default DeleteModal;
