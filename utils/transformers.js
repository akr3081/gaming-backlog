const tranformDetailsData = ({ hltbData, metacriticData }) => ({
  title: hltbData.name,
  imageUrl: hltbData.imageUrl,
  gameLength: {
    main: hltbData.gameplayMain,
    extras: hltbData.gameplayMainExtra,
    complete: hltbData.gameplayCompletionist,
  },
  releaseDate: metacriticData.components[0].data.item.releaseDate,
  reviewScore: metacriticData.components[0].data.item.criticScoreSummary.score,
  platforms: metacriticData.components[0].data.item.platforms.map((platform) => ({
    name: platform.name,
    score: platform.criticScoreSummary.score,
    releaseData: platform.releaseDate,
  })),
});

module.exports = {
  tranformDetailsData,
};
