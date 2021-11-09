import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import color from '../../utils/Configs'

export default {
  category: "Utility",
  description: "Returns the uptime of the bot",
  testOnly: true,
  guildOnly: false,
  slash: true,
  callback: ({ client, interaction }) => {
    const msToTime = (ms: number) => {
      let seconds = (ms / 1000)
      let minutes = (ms / (1000 * 60))
      let hours = (ms / (1000 * 60 * 60))
      let days = (ms / (1000 * 60 * 60 * 24))
      if (seconds < 60) return seconds.toFixed(1) + " Sec";
      else if (minutes < 60) return minutes.toFixed(1) + " Min";
      else if (hours < 24) return hours.toFixed(1) + " Hrs";
      else return days.toFixed(1) + " Days";
    };

    const embed = new MessageEmbed()
    .setColor('#29ABE2')
    .setTitle(`Uptime`)
    .setDescription(`The bot has been online for \`\`\`${msToTime(client.uptime!)}\`\`\``)

    interaction.reply({
        embeds: [embed]
    })
  },
} as ICommand;
