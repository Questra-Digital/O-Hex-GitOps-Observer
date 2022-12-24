import { Configuration, Session, V0alpha2Api } from "@ory/client";
import { AxiosError } from "axios";
import { edgeConfig } from "@ory/integrations/next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Initialize the Ory Kratos SDK which will connect to the
// /api/.ory/ route we created in the previous step.
const kratos = new V0alpha2Api(new Configuration(edgeConfig));
// ...

const HomePage = () => {
  // Contains the current session or undefined.
  const router = useRouter();

  //const sessionObject = JSON.parse(sessionData);
  const [session, setSession] = useState();
  const [logoutUrl, setLogoutUrl] = useState();

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("session"));
    const logoutUrlData = localStorage.getItem("logoutUrl");
    setSession(sessionData);
    setLogoutUrl(logoutUrlData);
  }, []);

  return (
    <div>
      <div className="mt-10">
        <h1>
          {session ? (
            <>
              You are signed in using <a href="https://www.ory.sh/">Ory</a>!
            </>
          ) : (
            <>
              Add Auth to <a href={"https://nextjs.org"}>Next.js</a> with{" "}
              <a href="https://www.ory.sh/">Ory</a>!
            </>
          )}
        </h1>

        <p>
          {session ? (
            <>
              <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <a href={"/api/.ory/self-service/settings/browser"}>
                  Update your settings
                </a>
              </button>
              <button className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <a
                  data-testid="logout"
                  href={logoutUrl}
                  aria-disabled={!logoutUrl}
                >
                  sign out
                </a>
              </button>
            
            </>
          ) : (
            <>Not session</>
          )}
        </p>
        {session ? (
          <div>
            <>
              <p>Find your session details below. </p>
              <pre>
                <code data-testid={"session-content"}>
                  {JSON.stringify(session, null, 2)}
                </code>
              </pre>
            </>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
