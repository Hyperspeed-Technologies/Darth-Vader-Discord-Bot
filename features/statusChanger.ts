import { Client } from "discord.js";
import WOKCommands from "wokcommands";
import { getAllFiles } from "../utils/commandCount";
import path from "path";

export default (client: Client, instance: WOKCommands) => {
  const dir = path.join(__dirname, "../commands");

  let commandCount: Array<any> = getAllFiles(dir, ".ts");

  

  const statusOptions = [
    `Darth Vader Discord Bot`,
    `${commandCount.length} commands!`,
    `!help`,
  ];

  let counter = 0;

  const updateStatus = () => {
    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: statusOptions[counter],
        },
      ],
    });

    if (++counter >= statusOptions.length) {
      counter = 0;
    }

    // console.log(commandCount)

    setTimeout(updateStatus, 1000 * 10);
  };
  updateStatus();
};

const config = {
  displayName: "Status Changer",
  dbName: "STATUS_CHANGER",
};

export { config };
