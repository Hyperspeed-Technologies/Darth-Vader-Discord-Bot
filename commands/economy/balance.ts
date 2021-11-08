import { ICommand } from "wokcommands";
import DJS from "discord.js";
import { getImperialCredits } from '../../utils/Economy'

export default {
  category: "Economy",
  description: "Gets the balance for the member",
  expectedArgs: "<Member to be banned>",
  maxArgs: 1,
  hidden: false,
  testOnly: true,
  guildOnly: true,
  slash: true,
  options: [
    {
      name: "member",
      description: "Select the member whose balance you want to get",
      required: false,
      type: DJS.Constants.ApplicationCommandOptionTypes.USER,
    },
  ],
  callback: async ({ interaction }) => {
      const targetUser = interaction.options.getUser('member') || interaction.user

        const guildId = interaction.guild?.id
        const userId = targetUser.id

        const imperialCredits = await getImperialCredits(guildId!, userId)

      interaction.reply(`ID: ${targetUser.id} has ${imperialCredits} imperial Credits`)
  },
} as ICommand;
