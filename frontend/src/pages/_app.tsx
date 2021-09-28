import type { AppProps } from "next/app";
import LayoutComponent from "../components/LayoutComponent";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
