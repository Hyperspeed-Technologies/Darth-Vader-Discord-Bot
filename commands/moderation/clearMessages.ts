import { ICommand } from "wokcommands";
import { TextChannel, MessageEmbed, Message } from "discord.js";
import getQuote from "../../utils/randomQuote";

export default {
  category: "Moderation",
  description: "Deletes the amount of messages selected",
  expectedArgs: "<number of messages to be deleted>",
  requiredPermissions: ["MANAGE_MESSAGES"],
  minArgs: 1,
  hidden: false,
  testOnly: true,
  guildOnly: false,
  slash: true,
  options: [
    {
      name: "number-of-messages",
      description: "Select the amount of messages to be deleted",
      required: true,
      type: "NUMBER",
    },
  ],
  // error: ({ error, command }) => {

  // },
  callback: async ({ interaction, args }) => {
    //const messageAmount = interaction.options.getNumber('number-of-messages')
    const messageAmount = parseInt(args[0]);
    const Channel = interaction.channel as TextChannel;

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`I have deleted \`\`${messageAmount}\`\` messages! `)
      .setFooter(`Darth Vader quote: ${getQuote()}`);

    const noMessageEmbed = new MessageEmbed()
      .setColor("RED")
      .setDescription("There are no messages to be deleted.")
      .setFooter(`Darth Vader Quote: ${getQuote()}`);

    const tooMuchMsg = new MessageEmbed()
      .setColor("YELLOW")
      .setDescription("I can only delete up to 100 messages");
    //.setFooter(`Darth Vader QuoteL ${getQuote()}`);

    if (messageAmount > 100) return interaction.reply({ embeds: [tooMuchMsg] });

    await interaction.channel?.messages
      .fetch({ limit: messageAmount })
      .then(async (messages) => {
        if (messages.size === 0) {
          interaction.reply({
            embeds: [noMessageEmbed],
          });
          return;
        }
        try {
          await Channel.bulkDelete(messages);
          interaction.reply({
            embeds: [embed],
          });
        } catch (error: any) {
          interaction.reply({ content: `${error}` });
          //   console.log(error);
        }
      });
  },
} as ICommand;
