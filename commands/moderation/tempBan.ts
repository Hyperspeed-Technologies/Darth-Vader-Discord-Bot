import { ICommand } from 'wokcommands';
import DJS, { GuildMemberManager, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, CollectorFilter } from 'discord.js';
import getQuote from '../../utils/randomQuote';

export default {
    category: 'Moderation',
    description: 'Bans the selected member',
    expectedArgs: '<Member to be banned>',
    requiredPermissions: ['BAN_MEMBERS'],
    minArgs: 1,
    hidden: false,
    testOnly: true,
    guildOnly: true,
    slash: true,
    options: [
        {
            name: 'member',
            description: 'Select the member to be banned',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.USER
        },
        {
            name: 'reason',
            description: 'Reason for the ban',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'duration',
            description: 'Duration of the ban in days',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }
    ],
    callback: ({ interaction, channel }) => {
        const user = interaction.options.getUser('member')
        const userID = user?.id
        const target = interaction.guild?.members.cache.get(userID!)
        const reason = interaction.options.getString('reason')
        const duration = interaction.options.getNumber('duration')

        // Buttons
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('ban_yes')
            .setEmoji('🔨')
            .setLabel('Confirm')
            .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('ban_no')
            .setEmoji('❎')
            .setLabel('Cancel')
            .setStyle('DANGER')
        )
        

        // Embeds

        const kickedEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Banned member <@${target?.id}> for ${duration} days.`)
        .setFooter(`Quote: ${getQuote()}`)

        const cancelledEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription('User not banned.')
        .setFooter(`Quote: ${getQuote()}`)

        const confirmEmbed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription(`Confirm you want to ban: ${target?.user.username}?`)

        
        // First Response to interaction
            interaction.reply({
                embeds: [confirmEmbed],
                components: [row],
                ephemeral: true
            })

        // Button Interaction Collector

        const buttonCollector = channel.createMessageComponentCollector({
            max: 1,
            time: 1000 * 15
        })

        buttonCollector.on('end', (collection) => {
            if(collection.first()?.customId === 'ban_yes') {
                target?.ban({
                    days: duration!,
                    reason: reason!
                })
                interaction.editReply({
                    embeds: [kickedEmbed],
                    components: []
                })
            } else if (collection.first()?.customId === 'ban_no') {
                interaction.editReply({
                    embeds: [cancelledEmbed],
                    components: []
                })
            }
        })
    }
} as ICommand