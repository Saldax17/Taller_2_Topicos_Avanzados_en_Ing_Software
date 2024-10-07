import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TeamListPage } from '../pages/TeamListPage';
import { TeamCreationPage} from '../pages/PokemonDetailList';
import * as testData from '../data/teamData.json';

test('Create and validate new Team', async ({ page }) => {
    test.slow()
    const homePage = new HomePage(page)
    const teamListPage = new TeamListPage(page)
    const TeamCreationPage = new TeamCreationPage(page)
    const pokemonDetailList = new PokemonDetailsPage(page)

    await homePage.navigate()
    await homePage.openTeamBuilder()
    await teamListPage.createNewTeam()
    await TeamCreationPage.selectFormat(testData.format, testData.gen)
    for (const pokemon of testData.pokemon){
        await TeamCreationPage.addPokemon(pokemon.name)
        
        await pokemonDetailList.selectItem(pokemon.item)
        await pokemonDetailList.selectMoves(pokemon.moves)
        await pokemonDetailList.setEVStats(pokemon.evStats)

        await pokemonDetailList.verifyTotalEvCount()
        await page.screenshot({ path: `${pokemon.name}.png`})
        await pokemonDetailList.goBackToTeam()
    }

    await page.screenshot({ path: `team.png`})
    await TeamCreationPage.validateTeam(testData.format, testData.gen)

})