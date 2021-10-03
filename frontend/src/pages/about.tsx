import { FunctionComponent } from "react";
import { motion, Variants } from "framer-motion";
import Head from "next/head";

const listVariant: Variants = {
  opened: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
};

const itemVariant: Variants = {
  opened: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

interface AboutPageProps {}

const AboutPage: FunctionComponent<AboutPageProps> = () => {
  return (
    <>
      <Head>
        <title>About | RESTful Todolist</title>
      </Head>
      <div className="mx-auto">
        <div className="container p-5">
          <h1 className="text-5xl">About</h1>
          <hr />
          <br />
          <p>
            This is a side project for learning the web.
            <br />
            This project was made with:
          </p>
          <motion.ul
            variants={listVariant}
            initial="closed"
            animate="opened"
            className="p-5 m-5 list-disc"
          >
            <motion.li variants={itemVariant}>Typescript</motion.li>
            <motion.li variants={itemVariant}>TailwindCSS</motion.li>
            <motion.li variants={itemVariant}>Next.js</motion.li>
            <motion.li variants={itemVariant}>express.js</motion.li>
            <motion.li variants={itemVariant}>MongoDB</motion.li>
            <motion.li variants={itemVariant}>Node.js</motion.li>
            <motion.li variants={itemVariant}>REST API</motion.li>
          </motion.ul>
          <p>RESTful TodoList 2021</p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
