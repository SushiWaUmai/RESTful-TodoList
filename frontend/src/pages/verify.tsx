import { GenericResponse } from "@shared/SharedTypes";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent, useEffect, useState } from "react";

interface UserRolePageProps {}

const UserRolePage: FunctionComponent<UserRolePageProps> = () => {
  const [verificationMessage, setVerificationMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      let query = router.query;
      let userrole = query.userrole;

      if (!userrole) return;

      let data: GenericResponse = await (
        await axios.post(
          "http://localhost:4000/user/verify",
          { userrole },
          {
            withCredentials: true,
          }
        )
      )?.data;

      if (data && !data.error) {
        setVerificationMessage("Verified");
      } else {
        setVerificationMessage(data.error?.message + "");
      }
    };

    verify();
  }, [router]);

  return (
    <div>
      <p>{verificationMessage}</p>
    </div>
  );
};

export default UserRolePage;
