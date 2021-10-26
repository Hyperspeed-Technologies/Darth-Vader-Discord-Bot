import { ICommand } from "wokcommands";
import DJS, { MessageEmbed } from "discord.js";
import premiumGuildSchema from "../../models/premium-guild-schema";

export default {
  category: "Owner",
  description: "Adds a guild to the premium system",
  expectedArgs: "<Guild ID>",
  ownerOnly: true,
  minArgs: 1,
  testOnly: true,
  guildOnly: true,
  slash: "both",
  options: [
    {
      name: "guild-id",
      description: "ID of the guild",
      required: true,
      type: "STRING",
    },
  ],
  callback: async ({ interaction }) => {
    const guildId = interaction.options.getString("guild-id");

    const results = await premiumGuildSchema.findOne({
      guildId: guildId,
    });

    const existingActiveGuild = new MessageEmbed()
      .setColor("YELLOW")
      .setDescription(
        `Guild with id: \`${guildId}\` already has an active subscription to the premium system`
      );

    const reActivatingPremiumGuild = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        `Guild with id: \`${guildId}\` already had an inactive subscription to the premium system, activating it again.`
      );

    const newPremiumGuild = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Adding guild: \`${guildId}\` to the premium system`);

    if (results && results.active)
      return interaction.reply({ embeds: [existingActiveGuild] });
    if (results && !results.active) {
      await premiumGuildSchema
        .findOneAndUpdate(
          {
            guildId: guildId,
          },
          {
            active: true,
          }
        )
        .then(() => {
          interaction.reply({ embeds: [reActivatingPremiumGuild] });
        });
    }
    if (!results) {
      await premiumGuildSchema
        .findOneAndUpdate(
          {
            guildId: guildId,
          },
          {
            guildId: guildId,
            tier: "Padawan",
            permanent: false,
            active: true,
            expire: new Date(),
          },
          {
            upsert: true,
          }
        )
        .then(() => {
          interaction.reply({ embeds: [newPremiumGuild] });
        });
    }
  },
} as ICommand;
