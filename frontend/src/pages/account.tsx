import { FunctionComponent, useContext } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ButtonComponent from "../components/ButtonComponent";
import { UserContext } from "../components/LayoutComponent";
import SettingsTab from "../components/account/SettingsTab";
import UserTab from "../components/account/UserTab";

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
          <Tabs>
            <div className="flex">
              <div className="bg-gray-800 p-5">
                <TabList>
                  <Tab>
                    <ButtonComponent className="block p-5 hover:bg-gray-400 hover:text-black">
                      User
                    </ButtonComponent>
                  </Tab>
                  <Tab>
                    <ButtonComponent className="block p-5 hover:bg-gray-400 hover:text-black">
                      Settings
                    </ButtonComponent>
                  </Tab>
                </TabList>
              </div>
              <div className="p-5 m-5 flex-grow">
                <div className="p-5 rounded bg-gray-900">
                  <TabPanel>
                    <UserTab user={user} setUser={setUser}/>
                 </TabPanel>

                  <TabPanel>
                    <SettingsTab />
                  </TabPanel>
                </div>
              </div>
            </div>
          </Tabs>
        ) : null}
      </div>
    </div>
  );
};

export default AccountPage;
