import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import ButtonComponent from "./ButtonComponent";
import { BsList, BsListCheck } from "react-icons/bs";
import Link from "next/link";
import { UserContext } from "./LayoutComponent";

export default function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (innerWidth > 1024) {
      setIsOpen(true);
    }
    window.onresize = () => {
      if (document.body.clientWidth > 1024) {
        setIsOpen(true);
      }
    };
  }, []);

  const linkVariants: Variants = {
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.25,
        damping: 10,
      },
    },
    closed: {
      opacity: 0,
      y: "-10vh",
    },
  };

  return (
    <nav className="bg-gray-500 text-black dark:bg-gray-900 dark:text-white">
      <div className="flex p-3 justify-between align-middle flex-wrap">
        <div className="block">
          <ButtonComponent className="p-3 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black">
            <Link href="/" passHref>
              <div>
                <BsListCheck className="inline mr-5" />
                RESTful Todolist
              </div>
            </Link>
          </ButtonComponent>
        </div>
        <div className="p-3 block lg:hidden">
          <ButtonComponent
            className="px-3 py-2 border rounded border-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsList />
          </ButtonComponent>
        </div>

        <AnimatePresence initial={false} exitBeforeEnter={false}>
          {isOpen && (
            <div className="inline-block w-full lg:flex lg:align-middle lg:w-auto">
              <ul>
                {user ? (
                  <>
                    <motion.li
                      className="block p-3 my-3 lg:inline-block lg:my-0"
                      initial="closed"
                      animate="opened"
                      exit="closed"
                      variants={linkVariants}
                    >
                      <ButtonComponent>
                        <Link href="/account">{user.username}</Link>
                      </ButtonComponent>
                    </motion.li>

                    <motion.li
                      className="block p-3 my-3 lg:inline-block lg:my-0"
                      initial="closed"
                      animate="opened"
                      exit="closed"
                      variants={linkVariants}
                    >
                      <ButtonComponent>
                        <Link href="/dashboard">Dashboard</Link>
                      </ButtonComponent>
                    </motion.li>
                  </>
                ) : (
                  <>
                    <motion.li
                      className="block p-3 my-3 lg:inline-block lg:my-0"
                      initial="closed"
                      animate="opened"
                      exit="closed"
                      variants={linkVariants}
                    >
                      <ButtonComponent>
                        <Link href="/login">Login</Link>
                      </ButtonComponent>
                    </motion.li>
                    <motion.li
                      className="block p-3 my-3 lg:inline-block lg:my-0"
                      initial="closed"
                      animate="opened"
                      exit="closed"
                      variants={linkVariants}
                    >
                      <ButtonComponent>
                        <Link href="/register">Register</Link>
                      </ButtonComponent>
                    </motion.li>
                  </>
                )}
              </ul>
            </div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
