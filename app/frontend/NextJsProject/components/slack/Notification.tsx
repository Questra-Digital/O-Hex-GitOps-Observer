import AddSlackCredentials from "../modal/AddSlackCredentials";
import AddCurrentChannel from "../modal/AddCurrentChannel";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getslackCredentials } from "../../store/slack/slackCredentialsSlice";

const GET_SLACK_CREDENTIALS = gql`
  query GetSlackCredentials($username: String!) {
    getSlackCredentials(username: $username) {
      _id
      username
      botusertoken
      currentchannelid
      channels {
        channelid
        channelname
      }
    }
  }
`;

const Notification = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_SLACK_CREDENTIALS, {
    client,
    variables: { username: "ali2022" },
  });
  const [slackCredentials, setSlackCredentials] = useState(
    data ? data.getSlackCredentials : null
  );

  useEffect(() => {
    if (data) {
      setSlackCredentials(data.getSlackCredentials);
      dispatch(getslackCredentials(data.getSlackCredentials));
    }
  }, [data]);

  console.log("data : ", slackCredentials);

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        {slackCredentials && (
          <div className="p-4 rounded-md border mb-5">
            <p>
              <b>Username</b>: {slackCredentials.username}
            </p>
            <p>
              <b>Bot User Token</b>: {slackCredentials.botusertoken}
            </p>
          </div>
        )}
        {!slackCredentials && <span>No Slack credentials found.</span>}
        <ul className="space-y-2">
          <li className="pt-5">
            {/* <button className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg">
            Add credentials
          </button> */}
            <AddSlackCredentials/>
          </li>
          <li>
            {/* <button className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg"> */}
            <AddCurrentChannel />
            {/* </button> */}
          </li>
          <li>
            <button disabled={true} className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
              Add more channels
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Notification;
