import economyProfleSchema from "../models/economy-profle-schema";

export const getImperialCredits = async (guildId: string, userId: string) => {
  try {
    // Running Find One
    const result = await economyProfleSchema.findOne({
      guildId,
      userId,
    });

    // console.log(`RESULT: `, result);

    let imperialCredits = 0;

    if (result) {
      imperialCredits = result.imperialCredits;
    } else {
    //   console.log(`Inserting a document`);
      await new economyProfleSchema({
        guildId,
        userId,
        imperialCredits,
      }).save();
    }

    return imperialCredits;
  } catch (error) {}
};

export const addImperialCredits = async (
  guildId: string,
  userId: string,
  imperialCredits: number
) => {
  try {
    // console.log(`Running findOneAndUpdate()`);

    const result = await economyProfleSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          imperialCredits,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return result.imperialCredits

  } catch (error) {}
};
