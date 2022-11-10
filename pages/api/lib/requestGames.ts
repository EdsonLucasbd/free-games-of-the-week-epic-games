import { getGames } from "epic-free-games/dist";
import moment from "moment";

export async function requestGames() {
  const gamesList: Record<string, string | Promise<string>>[] = []
  await getGames("BR").then(res => {
    const { currentGames, nextGames } = res;

    currentGames.forEach(game => {
      let gameData: Record<string, string | Promise<string>> = {}

      const image = game.keyImages.filter(obj => obj.type = 'Thumbnail')
      const date = game.promotions.promotionalOffers[0].promotionalOffers[0].endDate
      const expiration = moment(date.split('T')[0], "YYYY-DD-MM").locale('pt-br').format('L').toString()

      gameData['name'] = game.title;
      gameData['image'] = image[0].url;
      gameData['expiration'] = expiration;
      gameData['description'] = game.description;
      gameData['status'] = 'active';

      gamesList.push(gameData)
    })

    nextGames.forEach(game => {
      let gameData: Record<string, string | Promise<string>> = {}

      const image = game.keyImages.filter(obj => obj.type = 'Thumbnail')

      gameData['name'] = game.title;
      gameData['image'] = image[0].url;
      gameData['expiration'] = '00/00/0000';
      gameData['description'] = game.description;
      gameData['status'] = 'disabled';

      gamesList.push(gameData)
    })

    console.log("lista", gamesList)
  }).catch(err => {

    console.error("ERROR...", err)
  });

  return gamesList;
}
