import { ICommand } from "wokcommands";
import DJS, { Message, MessageActionRow, MessageEmbed, MessageSelectMenu, MessageSelectOptionData, TextChannel } from "discord.js";

export default {
  category: "Utility",
  description: "Edits the selected message",
  expectedArgs: "<Channel Tag> <Message Id>",
  requiredPermissions: ["MANAGE_MESSAGES"],
  minArgs: 2,
  hidden: false,
  testOnly: true,
  guildOnly: true,
  slash: true,
  options: [
    {
      name: "channel-tag",
      description: "The channel in which the message to be edited is",
      required: true,
      type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
    },
    {
      name: "message-id",
      description: "The ID of the message to be edited",
      required: true,
      type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  callback: async ({ interaction, client }) => {
    const channel = interaction.options.getChannel(
      "channel-tag"
    ) as TextChannel;

    const messageId = interaction.options.getString("message-id");

    const noMessageEmbed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`I could not find a message matching this id.`);

    const noBotEmbed = new MessageEmbed()
      .setColor("YELLOW")
      .setDescription(
        `Please provide a message ID that was sent from <@${client.user?.id}>`
      );

    const noEmbedInMessage = new MessageEmbed()
      .setColor("RED")
      .setDescription(`Please provide a message ID that has at least 1 embed`);
    // Get target message
    const targetMessage = await channel.messages.fetch(messageId!, {
      cache: true,
      force: true,
    });

    if (!targetMessage) return interaction.reply({ embeds: [noMessageEmbed] });

    if (targetMessage.author.id !== client.user?.id)
      return interaction.reply({ embeds: [noBotEmbed] });

    const checkEmbed = targetMessage.embeds[0];

    if (!checkEmbed) {
      return interaction.reply({
        embeds: [noEmbedInMessage],
      });
    }

    const option: MessageSelectOptionData[] = [
        {
          label: `Description`,
          value: `Description`  
        },
        {
            label: 'Title',
            value: 'Title'
        },
        {
            label: 'Footer',
            value: 'Footer',
        }
    ]

    let row = new MessageActionRow()
    const menu = new MessageSelectMenu()
    row.addComponents(
        menu.addOptions(option)
    )

    interaction.reply({
        content: `Which parts of the embed do you want to edit?`,
        components: [row]
    })

    

  },
} as ICommand;
