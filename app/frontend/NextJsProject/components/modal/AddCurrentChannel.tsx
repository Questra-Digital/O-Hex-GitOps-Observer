import React from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Router from "next/router";

import { useState } from "react";

const channels = ["channel1", "channel2", "channel3"];

export default function AddCurrentChannel() {
  const [selectedChannel, setSelectedChannel] = useState("");

  const handleSelect = (event: any) => {
    setSelectedChannel(event.target.value);
  };
  // to open and close the add workspace model
  const [showModal, setShowModal] = React.useState(false);

  // input for workspace name when adding a new one
  const [inputToken, setInputToken] = React.useState("");
  const [inputChannelName, setInputChannelName] = React.useState("");
  const [inputChannelId, setInputChannelId] = React.useState("");

  const handleAddSlackCredentials = async () => {
    // make request to add the a new workspace in the database
    // The two inputs are workspace name & username

    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateSlackCredentials($input: CreateSlackCredentialsInput!) {
          createSlackCredentials(input: $input) {
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
      `,
      variables: {
        input: {
          botusertoken: inputToken,
          currentchannelid: inputChannelId,
          channels: [
            {
              channelname: inputChannelName,
              channelid: inputChannelId,
            },
          ],
          username: "ali2022",
        },
      },
    });
    // once added, empty the input box
    Router.reload();
    setInputToken("");
    setInputChannelName("");
    setInputChannelId("");
  };

  return (
    <>
      {/* appears on the sidebar to add a new workspace  */}
      <button
        className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Set current notification channel
      </button>

      {/* model will only appear, if the add workspace button has been clicked  */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h5 className="text-3xl font-semibold">Set current notifications</h5>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  <div>
                    <label
                      htmlFor="channel-select"
                      className="block text-gray-700  mb-2"
                    >
                      Select a Channel where you want send your notifications
                    </label>
                    <select
                      id="channel-select"
                      value={selectedChannel}
                      onChange={handleSelect}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Choose a Channel</option>
                      {channels.map((channel) => (
                        <option key={channel} value={channel}>
                          {channel}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* footer, containing close and save button */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddSlackCredentials}
                    // onClick={() => setShowModal(false)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
