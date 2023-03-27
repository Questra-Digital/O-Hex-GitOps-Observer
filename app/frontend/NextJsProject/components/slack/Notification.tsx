import AddSlackCredentials from "../modal/AddSlackCredentials";
import AddCurrentChannel from "../modal/AddCurrentChannel";

const Notification = () => {
  return (
    <>
      <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
      <ul className="space-y-2">
        <li>
          {/* <button className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg">
            Add credentials
          </button> */}
          <AddSlackCredentials/>
        </li>
        <li>
          {/* <button className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg"> */}
            <AddCurrentChannel/>
          {/* </button> */}
        </li>
        <li>
          <button className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg">
            Add more channels
          </button>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Notification;
