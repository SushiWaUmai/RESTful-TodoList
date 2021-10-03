import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <Head>
        <title>Home | RESTful Todolist</title>
      </Head>
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto bg-gradient-to-br from-yellow-400 via-red-500 to-purple-400 p-32 font-bold"
        >
          <div className="flex justify-center align-middle">
            <h1 className="select-none text-6xl lg:text-9xl">
              RESTful Todolist
            </h1>
          </div>
        </motion.div>
        <div className="p-10">
          <h2 className="text-5xl">Responsive</h2>
          <br />
          <p>Very Responsive Website</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
