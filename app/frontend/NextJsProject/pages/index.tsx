import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header/Header";
import { useRouter } from "next/router";

import { Configuration, Session, V0alpha2Api } from "@ory/client";
import { AxiosError } from "axios";
import { edgeConfig } from "@ory/integrations/next";
import { useEffect, useState } from "react";

// Initialize the Ory Kratos SDK which will connect to the
// /api/.ory/ route we created in the previous step.
const kratos = new V0alpha2Api(new Configuration(edgeConfig));
// ...
const Home: NextPage = () => {
  const router = useRouter();
  // Contains the current session or undefined.
  const [session, setSession] = useState<Session>();

  // The URL we can use to log out.
  const [logoutUrl, setLogoutUrl] = useState<string>();

  // The error message or undefined.
  const [error, setError] = useState<any>();

  useEffect(() => {
    // If the session or error have been loaded, do nothing.
    if (session || error) {
      return;
    }

    // Try to load the session.
    kratos
      .toSession()
      .then(({ data: session }) => {
        // Session loaded successfully! Let's set it.
        setSession(session);
        localStorage.setItem("session", JSON.stringify(session));

        // Since we have a session, we can also get the logout URL.
        return kratos
          .createSelfServiceLogoutFlowUrlForBrowsers()
          .then(({ data }) => {
            setLogoutUrl(data.logout_url);
            localStorage.setItem("logoutUrl", data.logout_url);
          });
      })
      .catch((err: AxiosError) => {
        // An error occurred while loading the session or fetching
        // the logout URL. Let's show that!
        setError({
          error: err.toString(),
          data: err.response?.data,
        });
      });
  }, [session, error]);

  useEffect(() => {
    if (session) {
      router.push({
        pathname: "/userpage",
      });
    }
  });

  return (
    <div>
      <Header />


      <div className="grid place-items-center mt-10">
        <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href={"/api/.ory/self-service/registration/browser"}>
            create an account
          </a>
        </button>

        <button className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <a href={"/api/.ory/self-service/login/browser"}>sign in</a>
        </button>

        <p className="mt-3">
         <span> Your can </span> 
          <a
            href={"/api/.ory/self-service/recovery/browser"}
            className="text-red-600"
          >
            recover your account
          </a>
          <span> or </span> 
          <a href={"/api/.ory/self-service/verification/browser"}
          className="text-blue-600">
             verify your email address
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
