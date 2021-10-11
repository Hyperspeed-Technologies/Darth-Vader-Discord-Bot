import { ICommand } from 'wokcommands';
import DJS, { GuildMemberManager, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, CollectorFilter } from 'discord.js';
import getQuote from '../../utils/randomQuote';
import warnSchema from '../../models/warn-schema';

interface warnInterface {
    warningId: string,
    reason: string,
    moderatorId: string,
    timestamp: Date
}

export default {
    category: 'Moderation',
    description: 'Lists the warns for the selected user',
    expectedArgs: '<User>',
    requiredPermissions: ['MANAGE_MESSAGES'],
    minArgs: 1,
    hidden: false,
    testOnly: true,
    guildOnly: true,
    slash: true,
    options: [
        {
            name: 'user',
            description: 'Select the member to be warned',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.USER
        },
    ],
    callback: async ({ interaction }) => {
        const user = interaction.options.getUser('user')
        const member = interaction.guild?.members.cache.get(user?.id!)

        const noWarnEmbed: MessageEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`<@${user?.id}> does not have any warning.`)
            .setFooter(`Quote: ${getQuote()}`)

        const listWarnsEmbed: MessageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Warnings for: <@${user?.id}>`)
            .setFooter(`Quote: ${getQuote()}`)


        const results = await warnSchema.findOne({
            userId: user?.id,
            guildId: interaction.guild?.id
        })

        if (!results) {
            interaction.reply({
                embeds: [noWarnEmbed]
            })
        }

        const warnings: Array<warnInterface> = results.warns

        await warnings.forEach(warn => {
            listWarnsEmbed.addField(`Warn ID: ${warn.warningId} || Moderator: <@${warn.moderatorId}>`, `${warn.reason}`)
        });

        interaction.reply({
            embeds: [listWarnsEmbed]
        })
    }
} as ICommand