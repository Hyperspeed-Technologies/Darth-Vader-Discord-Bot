import { ICommand } from 'wokcommands';
import DJS, { GuildMemberManager, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, CollectorFilter } from 'discord.js';
import getQuote from '../../utils/randomQuote';
import warnSchema from '../../models/warn-schema';

export default {
    category: 'Moderation',
    description: 'Removes the selected warn from the selected user',
    aliases: ['delWarn'],
    expectedArgs: '<Warning ID> <User>',
    requiredPermissions: ['MANAGE_MESSAGES'],
    minArgs: 2,
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
        {
            name: 'warning-id',
            description: 'ID of the warning to be removed',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],
    callback: async ({ interaction }) => {
        const user = interaction.options.getUser('user')
        const warningId = interaction.options.getString('warning-id')

        

        // const warnObject = {
        //     warningId: getWarnId(),
        //     reason: reason,
        //     moderatorId: interaction.user.id,
        //     timestamp: new Date()
        // }

        const removedWarn = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Removed warning with id: \`\`${warningId}\`\` from <@${user?.id}>`)
        .setFooter(`Quote: ${getQuote()}`)

        await warnSchema.findOneAndUpdate({
            userId: user?.id,
            guildId: interaction.guild?.id
        }, {
            $pull: {
                warns: {
                    warningId: warningId
                }
            }
        }, {
            upsert: true
        })
        
        interaction.reply({
            embeds: [removedWarn]
        })
    }
} as ICommand