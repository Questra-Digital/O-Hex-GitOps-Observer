import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";

const Message = () => {
  const [message, setMessage] = useState("");
  let credentials: any = useSelector(
    (state: RootState) => state.slackCredentials.slackCredentials
  );

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const { data } = await client.mutate({
      mutation: gql`
        mutation sendMessage(
          $userbottoken: String!
          $channelid: String!
          $message: String!
        ) {
          sendMessage(
            userbottoken: $userbottoken
            channelid: $channelid
            message: $message
          )
        }
      `,
      variables: {
        userbottoken: credentials.botusertoken,
        channelid: credentials.currentchannelid,
        message: message,
      }
    });

    setMessage("");
    alert(data.sendMessage);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Message</h2>
        {credentials ? (
          <p className="m-1">
            Your message will be send to channel ID:{" "}
            <b className="text-red">{credentials.currentchannelid}</b>
          </p>
        ) : (
          <p className="m-1 text-red-500">
            You cant send messages until slack credentials have been updated.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Write a message..."
              value={message}
              onChange={handleInputChange}
              className="w-full mr-4 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!credentials}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Message;
