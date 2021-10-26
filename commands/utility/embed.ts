import {
  ButtonInteraction,
  Collector,
  Message,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Utility",
  description: "Sends an embed to the specified channel",
  expectedArgs: "<Channel> <Embed data in JSON format>",
  minArgs: 2,
  testOnly: true,
  guildOnly: true,
  slash: true,
  options: [
    {
      name: "channel",
      description: "Text channel for the embed to be sent",
      required: true,
      type: "CHANNEL",
    },
    {
      name: "embed-json",
      description: "Embed data in JSON format",
      required: true,
      type: "STRING",
    },
  ],
  callback: async ({ interaction }) => {
    const text = interaction.options.getString("embed-json");
    const embedChannel = interaction.options.getChannel(
      "channel"
    ) as TextChannel;
    const json = JSON.parse(text!);

    const embed = new MessageEmbed(json);

    const embedReviewActionRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("EMBED_CONFIRM")
          // .setEmoji('✅')
          .setLabel("Yes")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("EMBED_DENY")
          // .setEmoji('❌')
          .setLabel("No")
          .setStyle("DANGER")
      );

      try {
        interaction.reply({
            content: "Is this embed ok?",
            embeds: [embed],
            components: [embedReviewActionRow],
          });
      } catch (error) {
        interaction.reply({
            content: `The following error happened: 
            ${error}`
        })
      }
    

    const filter = (btnInt: MessageComponentInteraction) => {
      return interaction.user.id === btnInt.user.id;
    };

    const buttonCollector =
      interaction.channel?.createMessageComponentCollector({
        filter,
        max: 1,
        time: 1000 * 15,
      });

    buttonCollector?.on("collect", (i: MessageComponentInteraction) => {
      interaction.editReply({
        content: "Processing...",
      });
    });

    buttonCollector?.on("end", async (collection) => {
      collection.forEach(async (click) => {
        if (click.customId === "EMBED_CONFIRM") {
          await embedChannel.send({ embeds: [embed] }).then(() => {
            interaction.editReply({
              content: `Embed sent into channel: <#${embedChannel.id}>`,
              embeds: [],
              components: []
            });
          });
        }

        if (click.customId === "EMBED_DENY")
          return interaction.editReply({
            content:
              "Embed not sent, to send a new one, please use this command again.",
            embeds: [],
            components: [],
          });
      });
    });

    // try {
    //   await embedChannel.send({
    //     embeds: [embed],
    //   })
    //   .then(() => {
    //       interaction.reply(`Embed Sent!`)
    //   })
    // } catch (error) {
    //   interaction.reply({
    //     content:
    //       "There has been an error while trying to send the command, please check your JSON code.",
    //   });
    // }
  },
} as ICommand;
