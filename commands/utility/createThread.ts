import { MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import getQuote from "../../utils/randomQuote";

export default {
  category: "Utility",
  description: "Creates a thread in the current channel",
  expectedArgs: "<Thread Name> <Reason>",
  minArgs: 2,
  testOnly: true,
  guildOnly: true,
  slash: true,
  options: [
    {
      name: "thread-name",
      description: "Name for the thread",
      required: true,
      type: "STRING",
    },
    {
      name: "reason",
      description: "Reason for the thread",
      required: true,
      type: "STRING",
    },
    {
      name: "private",
      description: "private",
      required: true,
      type: "BOOLEAN",
    },
  ],
  callback: async ({ interaction }) => {
    const channel = interaction.channel as TextChannel;
    const threadName = interaction.options.getString("thread-name") as string;
    const threadReason = interaction.options.getString("reason") as string;
    const threadPrivate = interaction.options.getBoolean("private");

    await channel.threads
      .create({
        name: threadName!,
        autoArchiveDuration: 1440,
        type: threadPrivate ? "GUILD_PRIVATE_THREAD" : "GUILD_PUBLIC_THREAD",
        reason: threadReason,
      })
      .then(() => {
        console.log(threadName, threadReason, threadPrivate);
        const createdThread = new MessageEmbed()
          .setColor("GREEN")
          .setDescription("Created Thread")
          .addFields([
            {
              name: "Thread Name",
              value: threadName!,
              inline: true,
            },
            {
              name: "Thread reason",
              value: threadReason!,
              inline: true,
            },
            {
              name: "Is private?",
              value: threadPrivate! ? "Yes" : "No",
            },
          ])
          .setFooter(`${getQuote()}`)
        interaction.reply({
          // content: `Thread created!`
          embeds: [createdThread],
        });
      })
      .catch((error) => {
        console.log(`There was an error
        ${error}`);
      });
  },
} as ICommand;
