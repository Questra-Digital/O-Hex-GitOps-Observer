import type { NextPage } from "next";
import Header from "../components/header/Header";


const Home: NextPage = () => {

  return (
    <div>
      <Header />

      <div className="grid place-items-center mt-10">
        <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href={"http://localhost:4455/self-service/registration/browser"}>
            create an account
          </a>
        </button>

        <button className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <a href={"http://localhost:4455/self-service/login/browser"}>
            sign in
          </a>
        </button>

        <p className="mt-3">
          <span> Your can </span>
          <a
            href={"http://localhost:4455/self-service/recovery/browser"}
            className="text-red-600"
          >
            recover your account
          </a>
          <span> or </span>
          <a
            href={"http://localhost:4455/self-service/verification/browser"}
            className="text-blue-600"
          >
            verify your email address
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
