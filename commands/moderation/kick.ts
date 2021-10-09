import { ICommand } from 'wokcommands';
import DJS, { GuildMemberManager, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, CollectorFilter } from 'discord.js';
import getQuote from '../../utils/randomQuote';

export default {
    category: 'Moderation',
    description: 'Kicks the selected member',
    expectedArgs: '<Member to be kicked>',
    requiredPermissions: ['KICK_MEMBERS'],
    minArgs: 1,
    hidden: false,
    testOnly: true,
    guildOnly: true,
    slash: true,
    options: [
        {
            name: 'member',
            description: 'Select the member to be kicked',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.USER
        }
    ],
    callback: ({ interaction, guild, channel }) => {
        const user = interaction.options.getUser('member')
        const userID = user?.id
        const target = interaction.guild?.members.cache.get(userID!)

        // Buttons
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('kick_yes')
            .setEmoji('✅')
            .setLabel('Confirm')
            .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('kick_no')
            .setEmoji('❌')
            .setLabel('Cancel')
            .setStyle('DANGER')
        )
        

        // Embeds

        const kickedEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Kicked member ${target?.user.username}`)
        .setFooter(`Quote: ${getQuote()}`)

        const cancelledEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription('User not kicked.')
        .setFooter(`Quote: ${getQuote()}`)

        const confirmEmbed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription(`Confirm you want to kick: ${target?.user.username}?`)

        
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
            if(collection.first()?.customId === 'kick_yes') {
                target?.kick(`Test`)
                interaction.editReply({
                    embeds: [kickedEmbed],
                    components: []
                })
            } else if (collection.first()?.customId === 'kick_no') {
                interaction.editReply({
                    embeds: [cancelledEmbed],
                    components: []
                })
            }
        })
    }
} as ICommand