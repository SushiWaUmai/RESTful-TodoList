import { TodoItem } from "@shared/entities/TodoItem";
import { UserTodoItemResponse } from "@shared/SharedTypes";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import TodoListDisplay from "../../components/dashboard/TodoListDisplay";
import TodoManageContext from "../../components/dashboard/TodoManageContext";
import { UserContext } from "../../components/LayoutComponent";
import { BACKEND_URI } from "../../utils/Constants";
import Head from "next/head";

interface DashboardPageProps {}

export const SortTypeOptions = ["Date", "Title"] as const;
export type SortType = typeof SortTypeOptions[number];

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  const { user, setUser } = useContext(UserContext);
  const [showCompleted, setShowCompleted] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>("Date");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const router = useRouter();

  const getTodos = useCallback(async () => {
    let data: UserTodoItemResponse = (
      await axios.get(`${BACKEND_URI}/todos`, {
        withCredentials: true,
      })
    )?.data;
    if (!data?.error && data.todos) {
      setTodos(data.todos);
    } else {
      router.push("/account/login");
    }
  }, [router]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <Head>
        <title>Dashboard | RESTful Todolist</title>
      </Head>
      <div className="flex justify-center">
        <div className="container p-5 m-3">
          {user ? (
            <div>
              <h1 className="text-5xl">Welcome {user.username}!</h1>
              <hr />
              <br />
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex justify-center">
                  <TodoManageContext
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    className="flex flex-col"
                    showCompleted={showCompleted}
                    getTodos={getTodos}
                    toogleShowCompleted={() => {
                      setShowCompleted(!showCompleted);
                    }}
                  />
                </div>
                <TodoListDisplay
                  todos={todos}
                  sortBy={sortBy}
                  getTodos={getTodos}
                  showCompleted={showCompleted}
                  className="flex-grow"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center align-middle">
              <h1 className="text-5xl">Log in to see your todos here!</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
