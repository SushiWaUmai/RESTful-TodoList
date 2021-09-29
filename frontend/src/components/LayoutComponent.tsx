import React, { FunctionComponent, useEffect, useState } from "react";
import Head from "next/head";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import { UserResponse } from "@shared/SharedTypes";
import axios from "axios";
import { User } from "@shared/entities/User";

interface UserContextProps {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = React.createContext<UserContextProps>({});

interface LayoutComponentProps {}

const LayoutComponent: FunctionComponent<LayoutComponentProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      console.log("Update user");
      let data: UserResponse = (
        await axios.get("http://localhost:4000/user/me", {
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
