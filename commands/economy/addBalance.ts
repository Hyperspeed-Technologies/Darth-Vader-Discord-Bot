import { ICommand } from "wokcommands";
import DJS, { MessageEmbed } from 'discord.js';
import { addImperialCredits } from "../../utils/Economy";

export default {
    category: "Economy",
  description: "Adds the specified amount of imperial credits to the selected user",
  expectedArgs: "<User> <Amount of imperial credits to be added>",
  minArgs: 2,
  hidden: false,
  testOnly: true,
  guildOnly: true,
  slash: true,
  options: [
    {
      name: "user",
      description: "User to who you want to add imperial credits",
      required: true,
      type: DJS.Constants.ApplicationCommandOptionTypes.USER,
    },
    {
        name: "amount",
        description: 'Amount of imperial credits you want to add to the user',
        required: true,
        type: 'NUMBER'
    }
  ],
  callback: async ({ interaction }) => {
    const targetUser = interaction.options.getUser('user');
    const imperialCredits = interaction.options.getNumber('amount');
    const guildId = interaction.guild?.id;
    const userId = targetUser?.id;

    const results = await addImperialCredits(guildId!, userId!, imperialCredits!)

    const newBalanceEmbed = new MessageEmbed()
    .setColor('GREEN')
    .setDescription(`<@${targetUser?.id}> now has ${results} imperial credits <:ImperialCredit:905911328726741023>`)

    interaction.reply({
      embeds: [newBalanceEmbed]
    })

  }
} as ICommand