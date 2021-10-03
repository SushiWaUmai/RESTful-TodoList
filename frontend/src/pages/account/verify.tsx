import { GenericResponse } from "@shared/SharedTypes";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent, useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { BACKEND_URI } from "../../utils/Constants";
import Head from "next/head";

interface UserRolePageProps {}

const UserRolePage: FunctionComponent<UserRolePageProps> = () => {
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      let query = router.query;
      let uuid = query.uuid;

      if (!uuid) return;

      let data: GenericResponse = await (
        await axios.post(
          `${BACKEND_URI}/user/verify`,
          { uuid },
          {
            withCredentials: true,
          }
        )
      )?.data;

      if (data && !data.error) {
        setVerified(true);
        setVerificationMessage("Your E-Mail has been verified!");
      } else {
        setVerified(false);
        setVerificationMessage(data.error?.message + "");
      }
    };

    verify();
  }, [router]);

  return (
    <>
      <Head>
        <title>Verify | RESTful Todolist</title>
      </Head>
      <div>
        <div className="container m-5 mx-auto">
          <h1 className="text-3xl">{verificationMessage}</h1>
          <br />
          <ButtonComponent
            onClick={() => {
              router.push(verified ? "/account/dashboard" : "/");
            }}
            className="p-3 rounded bg-gradient-to-br from-yellow-400 to-red-500"
          >
            Go to {verified ? "dashboard" : "Home"}
          </ButtonComponent>
        </div>
      </div>
    </>
  );
};

export default UserRolePage;
