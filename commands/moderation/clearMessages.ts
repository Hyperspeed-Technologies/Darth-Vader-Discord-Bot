import { ICommand } from 'wokcommands'
import { TextChannel, MessageEmbed } from 'discord.js'
import getQuote from '../../utils/randomQuote';

export default {
    category: 'Moderation',
    description: 'Deletes the amount of messages selected',
    expectedArgs: '<number of messages to be deleted>',
    requiredPermissions: ['MANAGE_MESSAGES'],
    minArgs: 1,
    hidden: false,
    testOnly: true,
    guildOnly: false,
    slash: true,
    options: [
        {
            name: 'number-of-messages',
            description: 'Select the amount of messages to be deleted',
            required: true,
            type: 'NUMBER'
        }
    ],
    // error: ({ error, command }) => {

    // },
    callback: async ({ interaction, args }) => {
        //const messageAmount = interaction.options.getNumber('number-of-messages')
        const messageAmount = parseInt(args[0])
        const Channel = interaction.channel as TextChannel

        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`I have deleted \`\`${messageAmount}\`\` messages! `)
            .setFooter(`Darth Vader quote: ${getQuote()}`)

        const noMessageEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription('There are no messages to be deleted.')
        .setFooter(`Darth Vader Quote: ${getQuote()}`)

        await interaction.channel?.messages.fetch({ limit: messageAmount })
            .then(messages => {
                if (messages.size === 0) {
                    interaction.reply({
                        embeds: [noMessageEmbed]
                    })
                    return
                }
                Channel.bulkDelete(messages)
                interaction.reply({
                    embeds: [embed]
                })
            })





    }
} as ICommand