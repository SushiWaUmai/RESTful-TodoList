import React, { FunctionComponent } from "react";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import ButtonComponent from "./ButtonComponent";
import Link from "next/link";

interface FooterComponentProps {}

const FooterComponent: FunctionComponent<FooterComponentProps> = () => {
  return (
    <div className="flex justify-center">
      <ButtonComponent className="inline m-5">
        <a href="https://github.com/sushiwaumai">
          <title>Github</title>
          <AiFillGithub size={48} />
        </a>
      </ButtonComponent>
      <ButtonComponent className="inline m-5">
        <a href="https://www.instagram.com/eugenematsumura/">
          <title>Instagram</title>
          <AiOutlineInstagram size={48} />
        </a>
      </ButtonComponent>
      <ButtonComponent className="inline m-5">
        <a href="https://twitter.com/EugeneMatsumur1">
          <title>Twitter</title>
          <AiOutlineTwitter size={48} />
        </a>
      </ButtonComponent>
      <ButtonComponent className="inline m-5">
        <Link href="/">HOME</Link>
      </ButtonComponent>
      <ButtonComponent className="inline m-5">
          <Link href="/about">ABOUT</Link>
      </ButtonComponent>
    </div>
  );
};

export default FooterComponent;
