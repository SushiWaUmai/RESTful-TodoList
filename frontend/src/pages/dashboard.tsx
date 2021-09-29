import { FunctionComponent, useContext } from "react";
import TodoListDisplay from "../components/dashboard/TodoListDisplay";
import TodoManageContext from "../components/dashboard/TodoManageContext";
import { UserContext } from "../components/LayoutComponent";
interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="flex justify-center">
      <div className="container p-5 m-3">
        {user ? (
          <div>
            <h1 className="text-5xl">Welcome {user.username}!</h1>
            <hr />
            <br />
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex justify-center">
                <TodoManageContext />
              </div>
              <TodoListDisplay className="flex-grow" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center align-middle">
            <h1 className="text-5xl">Log in to see your todos here!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
