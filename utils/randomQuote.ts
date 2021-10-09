const quotes = [
    `He’s as clumsy as he is stupid.`,
    `You don’t know the power of the dark side! I must obey my master.`,
    `This will be a day long remembered. It has seen the end of Kenobi. It will soon see the end of the Rebellion.`,
    `I am altering the deal. Pray I don’t alter it any further.`,
    `Be careful not to choke on your aspirations.`,
    `You have controlled your fear. Now, release your anger. Only your hatred can destroy me.`,
    `When I left you, I was but the learner. Now I am the master.`,
    `Don’t be too proud of this technological terror you’ve constructed. The ability to destroy a planet is insignificant next to the power of the Force.`,
    `No… I am your Father…`,
    `I find your lack of faith disturbing.`
]

const getQuote = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    return quote
}

export default getQuote