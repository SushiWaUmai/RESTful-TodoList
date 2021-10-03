import React, { FunctionComponent, useEffect, useState } from "react";
import Head from "next/head";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import { UserNoPassword, UserResponse } from "@shared/SharedTypes";
import axios from "axios";
import { BACKEND_URI } from "../utils/Constants";

interface UserContextProps {
  user: UserNoPassword | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserNoPassword | undefined>>;
}

export const UserContext = React.createContext<UserContextProps>({
  user: { username: "", email: "", role: "UNVERIFIED", todoItems: [] },
  setUser: () => {},
});

interface LayoutComponentProps {}

const LayoutComponent: FunctionComponent<LayoutComponentProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserNoPassword>();

  useEffect(() => {
    const getUser = async () => {
      let data: UserResponse = (
        await axios.get(`${BACKEND_URI}/user/me`, {
          withCredentials: true,
        })
      )?.data;
      if (!data.error) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="text-black text-xl dark:text-white lg:text-2xl font-mono">
        <div className="flex h-screen flex-col justify-between">
          <Head>
            <meta httpEquiv="content-language" content="en" />
            <link rel="icon" href="/favicon.svg"></link>
          </Head>
          <header>
            <NavbarComponent />
          </header>
          <main className="bg-gray-200 dark:bg-gray-700 flex-grow">
            {children}
          </main>
          <footer className="bg-gray-600">
            <FooterComponent />
          </footer>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default LayoutComponent;
