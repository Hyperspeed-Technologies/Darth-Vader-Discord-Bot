import { Client } from "discord.js";

export default (client: Client) => {
    const statusOptions = [
        `Darth Vader Discord Bot`,
        `Lots of new features`,
        `!help`
    ]

    let counter = 0;

    const updateStatus = () => {
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        })

        if(++counter >= statusOptions.length) {
            counter = 0
        }

        setTimeout(updateStatus, 1000 * 10)
    }
    updateStatus()
}

const config = {
    displayName: 'Status Changer',
    dbName: 'STATUS_CHANGER'
}

export { config }