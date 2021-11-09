import {
  Client,
  GuildMember,
  MessageEmbed,
  Presence,
  TextChannel,
} from "discord.js";
import presenceUpdateSchema from "../models/presence-update-schema";

const presenceData = {} as {
  // guildID: [channel, message]
  [key: string]: [TextChannel, string];
};

const onlineStatuses = ["online", "dnd", "idle"];

export default (client: Client) => {
  client.on("presenceUpdate", async (oldPresence, newPresence) => {
    const { guild } = newPresence;

    let data = presenceData[guild?.id!];

    if (!data) {
      const results = await presenceUpdateSchema.findById(guild?.id!);
      if (!results) {
        return;
      }

      const { channelId } = results;

      const channelGuild = await client.guilds.fetch(guild?.id!);
      const channel = (await channelGuild.channels.fetch(
        channelId
      )) as TextChannel;

      const prevStatusChecker = (oldPresence: Presence) => {
        if (oldPresence.status === "offline") return "Offilne ⚫";
        if (oldPresence.status === "dnd") return "Do Not Disturb 🔴";
        if (oldPresence.status === "idle") return "Idle 💤";
        if (oldPresence.status === "online") return "Online 🟢";
      };

      const newStatusChecker = (newPresence: Presence) => {
        if (newPresence.status === "offline") return "Offilne ⚫";
        if (newPresence.status === "dnd") return "Do Not Disturb 🔴";
        if (newPresence.status === "idle") return "Idle 💤";
        if (newPresence.status === "online") return "Online 🟢";
      };

      const onlineEmbed = new MessageEmbed()
        .setColor("#29ABE2")
        .setTitle(`${newPresence.user?.tag}`)
        .setDescription(`<@${newPresence.user?.id}> came online.`)
        .addFields([
          {
            name: "Previous Status",
            value: `${prevStatusChecker(oldPresence!)}`,
            inline: true,
          },
          {
            name: "New Status",
            value: `${newStatusChecker(newPresence)}`,
            inline: true,
          },
        ]);

      const offlineEmbed = new MessageEmbed()
        .setColor("#29ABE2")
        .setTitle(`${newPresence.user?.tag}`)
        .setDescription(`<@${newPresence.user?.id}> went offline.`)
        .addFields([
          {
            name: "Previous Status",
            value: `${prevStatusChecker(oldPresence!)}`,
            inline: true,
          },
          {
            name: "New Status",
            value: `Offilne ⚫`,
            inline: true,
          },
        ]);

      if (newPresence.status === oldPresence?.status) return;

      if (newPresence.status === "offline")
        channel.send({ embeds: [offlineEmbed] });

      if (
        onlineStatuses.includes(newPresence.status) &&
        onlineStatuses.includes(oldPresence?.status!)
      )
        return;

      if (
        newPresence.status === "online" ||
        newPresence.status === "dnd" ||
        (newPresence.status === "idle" && oldPresence?.status === "offline")
      ) {
        channel.send({
          embeds: [onlineEmbed],
        });
      }
    }
  });
};

const config = {
  displayName: "Bot down detector",
  dbName: "EXTRA_BOT_DOWN_DETECTOR",
};

export { config };
