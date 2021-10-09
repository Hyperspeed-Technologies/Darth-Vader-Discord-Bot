import { Client } from "discord.js";
import { IFeatureConfig } from "wokcommands";

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
} as IFeatureConfig

export { config }