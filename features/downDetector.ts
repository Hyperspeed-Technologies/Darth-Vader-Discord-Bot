import { Client, GuildMember } from 'discord.js';

export default (client: Client) => {
    client.on('guildMemberUpdate', async (oldMember, newMember) => {
        // console.log(newMember.presence)
    })
}

const config = {
    displayName: 'Bot down detector',
    dbName: 'EXTRA_BOT_DOWN_DETECTOR'
}

export { config }