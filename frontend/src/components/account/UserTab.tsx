import { Dispatch, FunctionComponent, SetStateAction } from "react";
import Link from "next/link";
import { GenericResponse, UserNoPassword } from "@shared/SharedTypes";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/dist/client/router";
import ButtonComponent from "../ButtonComponent";
import { BACKEND_URI } from "../../utils/Constants";

interface UserTabProps {
  user: UserNoPassword;
  setUser: Dispatch<SetStateAction<UserNoPassword | undefined>>;
}

const UserTab: FunctionComponent<UserTabProps> = ({ user, setUser }) => {
  const router = useRouter();

  const handleLogout = async () => {
    let data: GenericResponse = (
      await axios.get(`${BACKEND_URI}/user/logout`, {
        withCredentials: true,
      })
    )?.data;

    if (data.error) {
      console.error("Failed to log out");
    }

    setUser(undefined);
    router.push("/");
  };

  return (
    <>
      <h1 className="text-4xl lg:text-5xl">{user.username}</h1>
      <br />
      <h1 className="text-gray-300">{user.email}</h1>
      <br />
      <h1 className="text-gray-300">
        User since {moment(user.createdAt).format("DD MMMM YYYY")}
      </h1>
      <ButtonComponent className="my-5 p-3 block bg-green-800 rounded">
        <Link href="/account/dashboard">Dashboard</Link>
      </ButtonComponent>
      <ButtonComponent
        onClick={handleLogout}
        className="my-5 p-3 block bg-yellow-700 rounded"
      >
        Log out
      </ButtonComponent>
    </>
  );
};

export default UserTab;
