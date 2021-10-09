import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Test command, will reply with success or error.',
    // expectedArgs: '<> <>'
    // minArgs: number
    // maxArgs: number
    // permissions: ['ADMINISTRATOR']
    // cooldown: '60s'
    // globalCooldown: '10m'
    hidden: false,
    testOnly: true, //For development purposes
    guildOnly: false,
    slash: true,
    // options: []
    // Invoked whenever an error occurs within one of your commands.
    // error: ({
    //     error,   // A specific string for what type of command occurred. See https://docs.wornoffkeys.com/commands/handling-command-errors
    //     command, // The name of the command that had an error
    //     message, // The Discord.JS message object
    //     info     // Additional information if needed
    // }) => {}
    callback: ({
        // message,    // The DJS message object
        // channel,    // The DJS channel object
        // args,       // An array of arguments without the command prefix/name
        // text,       // A joined string of the above arguments
        // client,     // Your bot's client object
        // prefix,     // The prefix used to run this command
        // instance,   // Your WOKCommands instance
        interaction // The interaction for slash commands
    }) => {
        return `Success executing command!!`
    }
} as ICommand