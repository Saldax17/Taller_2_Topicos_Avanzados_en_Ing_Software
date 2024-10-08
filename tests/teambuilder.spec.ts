import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TeamListPage } from '../pages/TeamListPage';
import { TeamCreationPage } from '../pages/TeamCreationPage';
import { PokemonDetailsPage } from '../pages/PokemonDetailList'
import * as testData from '../data/teamData.json';

test('Create and validate new Team', async ({ page }) => {
    test.slow()
    const homePage = new HomePage(page) 
    const teamListPage = new TeamListPage(page) 
    const teamCreationPage = new TeamCreationPage(page) 
    const pokemonDetailList = new PokemonDetailsPage(page)

    await homePage.navigate()
    await homePage.openTeamBuilder()
    await teamListPage.createNewTeam()
    await teamCreationPage.selectFormat(testData.format, testData.gen)
    let errors: string[] = []; // Lista para acumular los errores de las aserciones

    for (const pokemon of testData.pokemon) {
        console.log(`Agregando pokemon ${pokemon.name} al equipo`);

        // Agregar Pokémon al equipo
        await teamCreationPage.addPokemon(pokemon.name);
        
        // Seleccionar ítem, movimientos y estadísticas EV
        await pokemonDetailList.selectItem(pokemon.item);
        await pokemonDetailList.selectMoves(pokemon.moves);
        await pokemonDetailList.setEVStats(pokemon.evStats);

        console.log(`Validando assert para Pokémon ${pokemon.name}`);

        // Validar el total de EV restantes para el Pokémon
        try {
            let valueRemainingEv = await pokemonDetailList.verifyTotalEvCount();
            expect(valueRemainingEv).toBe(0); // Aserción
        } catch (error) {
            errors.push(`Error en el assert del Pokémon ${pokemon.name}: ${error.message}`); // Acumular errores
        }

        // Capturar pantalla si es necesario (comentar/descomentar según tu necesidad)
        // await page.screenshot({ path: `${pokemon.name}.png` });

        // Volver al equipo después de agregar y configurar el Pokémon
        await pokemonDetailList.goBackToTeam();
    }

    // Verificación de que el equipo es válido para la competencia
    try {
        await teamCreationPage.validateTeamCreation(testData.format, testData.gen);
        console.log('El equipo es válido para el formato de competencia.');
    } catch (error) {
        errors.push(`Error en la validación del equipo para el formato ${testData.format}: ${error.message}`);
    }

    // Al final del loop, si hubo errores, lanzamos un error con todos los detalles
    if (errors.length > 0) {
        console.error('Fallos en las siguientes aserciones: \n' + errors.join('\n'));
        throw new Error('La prueba falló');
    }


    // Añadido para hacer la ejecución más lenta
    await page.waitForTimeout(2000); // Espera 2 segundos antes de finalizar

    // await page.screenshot({ path: `team.png`})
    // await teamCreationPage.validateTeam(testData.format, testData.gen)

})