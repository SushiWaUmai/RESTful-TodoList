import { FunctionComponent, useContext } from "react";
import { Tab } from "@headlessui/react";
import ButtonComponent from "../../components/ButtonComponent";
import { UserContext } from "../../components/LayoutComponent";
import SettingsTab from "../../components/account/SettingsTab";
import UserTab from "../../components/account/UserTab";

interface AccountPageProps {}

const AccountPage: FunctionComponent<AccountPageProps> = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="flex justify-center">
      <div className="container p-5">
        <h1 className="text-5xl">Account</h1>
        <hr />
        <br />

        {user ? (
          <Tab.Group>
            <div className="flex flex-col lg:flex-row">
              <div className="bg-gray-800 p-5">
                <Tab.List>
                  <Tab className="block">
                    <ButtonComponent className="block p-5 hover:bg-gray-400 hover:text-black">
                      User
                    </ButtonComponent>
                  </Tab>
                  <Tab className="block">
                    <ButtonComponent className="block p-5 hover:bg-gray-400 hover:text-black">
                      Settings
                    </ButtonComponent>
                  </Tab>
                </Tab.List>
              </div>
              <div className="p-3 m-3 flex-grow">
                <div className="p-5 rounded bg-gray-900">
                  <Tab.Panel>
                    <UserTab user={user} setUser={setUser} />
                  </Tab.Panel>

                  <Tab.Panel>
                    <SettingsTab />
                  </Tab.Panel>
                </div>
              </div>
            </div>
          </Tab.Group>
        ) : null}
      </div>
    </div>
  );
};

export default AccountPage;
