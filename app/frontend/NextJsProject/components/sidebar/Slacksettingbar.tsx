import AddWorkspace from "../modal/AddWorkspace";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSlackMenu } from "../../store/slack/currentSlackMenuSlice";
import type { RootState } from "../../store";
import Link from "next/link";
import { useRouter } from "next/router";

const SlackSettingBar = ({ workspaces }: any) => {
  const USERNAME = "ali2022";
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSelectSlackMenu = (currSlackMenu: String) => {
    dispatch(setCurrentSlackMenu(currSlackMenu));
  };

  const currentSlackMenu = useSelector(
    (state: RootState) => state.currentSlackMenu.currentSlackMenu
  );

  return (
    <aside
      className="w-64 bg-gray-800  sm:min-h-screen p-3"
      aria-label="Sidebar"
    >
      <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
              <span
                className="flex-1 ml-3 whitespace-nowrap
              "
                onClick={() => handleSelectSlackMenu("Notifications")}
              >
                Notifications
              </span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                3
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span
                className="flex-1 ml-3 whitespace-nowrap"
                onClick={() => handleSelectSlackMenu("Messages")}
              >
                Messages
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SlackSettingBar;
