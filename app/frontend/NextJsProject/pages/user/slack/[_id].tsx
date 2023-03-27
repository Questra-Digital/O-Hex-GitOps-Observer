import Header from "../../../components/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSlackMenu } from "../../../store/slack/currentSlackMenuSlice";
import type { RootState } from "../../../store";
import SlackSettingBar from "../../../components/sidebar/Slacksettingbar";
import Notification from "../../../components/slack/Notification";
import AddChannel from "../../../components/slack/AddChannel";
import Message from "../../../components/slack/Message";

const Slack = () => {
  const currentSlackMenu = useSelector(
    (state: RootState) => state.currentSlackMenu.currentSlackMenu
  );

  return (
    <div>
      <Header />

      <div className="flex flex-row">
        <div className="basis-1/5">
          <SlackSettingBar />
        </div>
        <div className="basis-4/5">
          {currentSlackMenu == "Notifications" && <Notification />}
          {currentSlackMenu == "Add Channel" && <AddChannel/>}
          {currentSlackMenu == "Messages" && <Message/>}
        </div>
      </div>
    </div>
  );
};

export default Slack;
