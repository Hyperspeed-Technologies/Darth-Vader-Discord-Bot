import { MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
import getQuote from "../../utils/randomQuote"

export default {
    category: 'Moderation',
    description: 'Unbans the desired user',
    expectedArgs: '<ID of the user to be unbanned>',
    requiredPermissions: ['BAN_MEMBERS'],
    minArgs: 1,
    hidden: false,
    testOnly: true,
    guildOnly: true,
    slash: true,
    options: [
        {
            name: 'user-id',
            description: 'ID of the user to be unbanned',
            required: true,
            type: 'STRING'
        },
    ],
    callback: ({ interaction }) => {

        const unbannedEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setFooter(`Quote: ${getQuote()}`)

        const noValidId = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Please specify a valid banned user ID`)
        .setFooter(`Quote: ${getQuote()}`)

        const userId = interaction.options.getString('user-id')

        interaction.guild?.members
        .unban(userId!)
        .then((user) => {
            unbannedEmbed.setDescription(`${user.tag} has been unbanned from this guild.`)

            interaction.reply({
                embeds: [unbannedEmbed]
            })
        })
        .catch(() => {
            interaction.reply({
                embeds: [noValidId]
            })
        })
    }
} as ICommand