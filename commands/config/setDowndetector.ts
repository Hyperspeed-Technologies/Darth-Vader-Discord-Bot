import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import presenceUpdateSchema from "../../models/presence-update-schema";

export default {
  category: "Configuration",
  description: "Set's the channel in which the presence updates from the selected bots will be sent.",
  testOnly: true,
  guildOnly: true,
  slash: true,
  options: [
      {
        name: 'channel',
        description: 'Channel in which updates will be sent',
        required: true,
        type: 'CHANNEL'  
      }
  ],
  callback: async ({ interaction }) => {
      const target = interaction.options.getChannel('channel')

      await presenceUpdateSchema.findOneAndUpdate({
          _id: interaction.guild?.id
      }, {
          _id: interaction.guild?.id,
          channelId: target?.id
      }, {
          upsert: true
      })
      .then(() => {
          const embed = new MessageEmbed()
          .setColor('#29ABE2')
          .setDescription(`Down detector channel set to: <#${target?.id}>`)

          interaction.reply({
              embeds: [embed]
          })
      })
  }
} as ICommand;
