import { ICommand } from "wokcommands";
import DJS, { Message, MessageEmbed, TextChannel } from 'discord.js'

export default {
    category: 'Utility',
    description: 'Edits the selected message',
    expectedArgs: '<Channel Tag> <Message Id> <New Text>',
    requiredPermissions: ['MANAGE_MESSAGES'],
    minArgs: 3,
    hidden: false,
    testOnly: true,
    guildOnly: true,
    slash: true,
    options: [
        {
            name: 'channel-tag',
            description: 'The channel in which the message to be edited is',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },
        {
            name: 'message-id',
            description: 'The ID of the message to be edited',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'new-text',
            description: 'New text for the message',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],
    callback: async ({ interaction, client }) => {
        const channel = interaction.options.getChannel('channel-tag') as TextChannel

        const messageId = interaction.options.getString('message-id')

        const newContent = interaction.options.getString('new-text')

        let msg;

        

        const noMessageEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`I could not find a message with id: \`${messageId}\` in channel <#${channel.id}>`)

        try {
            msg = await channel.messages.fetch(messageId!)
        } catch (error) {
            // console.log(`There was an error getting the message`)
            return interaction.reply({embeds: [noMessageEmbed]})
        }

        if(!msg) return interaction.reply({embeds: [noMessageEmbed]})

        const editedMessageEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Message Edited!`)
        .addField('Old Content', msg.content, true)
        .addField('New Content', newContent!, true)

        // If message contains an embed, make the collector system to edit the embed

        if(msg.author.id !== client.user?.id) {
            interaction.reply({
                content: "I can't edit a message that I did not send."
            })
        }

        await msg.edit({
            content: newContent
        })
        .then(() => {
            interaction.reply({
                embeds: [editedMessageEmbed]
            })
        })

        // interaction.reply({
        //     content: "Editing message..."
        // })

    }
} as ICommand