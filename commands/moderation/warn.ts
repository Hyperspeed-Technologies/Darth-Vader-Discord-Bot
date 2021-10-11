import { ICommand } from 'wokcommands';
import DJS, { GuildMemberManager, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, CollectorFilter } from 'discord.js';
import getQuote from '../../utils/randomQuote';
import warnSchema from '../../models/warn-schema';

export default {
    category: 'Moderation',
    description: 'Warns the selected member',
    expectedArgs: '<Member to be warned> <Reason>',
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
            name: 'reason',
            description: 'Reason for the waring',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],
    callback: async ({ interaction }) => {
        const user = interaction.options.getUser('user')
        const member = interaction.guild?.members.cache.get(user?.id!)
        const reason = interaction.options.getString('reason')

        const warnedEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Warned <@${user?.id}> for \`\`${reason}\`\` `)
        .setFooter(`Quote: ${getQuote()}`)

        const getWarnId: Function = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        const warnObject = {
            warningId: getWarnId(),
            reason: reason,
            moderatorId: interaction.user.id,
            timestamp: new Date()
        }

        await warnSchema.findOneAndUpdate({
            userId: user?.id,
            guildId: interaction.guild?.id
        }, {
            userId: user?.id,
            guildId: interaction.guild?.id,
            $push: {
                warns: warnObject
            }
        }, {
            upsert: true
        })
        
        interaction.reply({
            embeds: [warnedEmbed]
        })
    }
} as ICommand