import { Page } from '@playwright/test';

export class PokemonDetailsPage {
  private page: Page;
  private abilitySlot;
  private ivSpreadDropdown;
  private moves;
  private evStatInputs;
  private evStatPanel;
  private backToTeamButton;
  private totalEv;
  private itemSlot;

  constructor(page: Page) {
    this.page = page;

    // Inicializamos los selectores que corresponden a la página
    this.abilitySlot = page.locator('input[name="ability"]');
    this.ivSpreadDropdown = page.locator('select[name="ivspread"]');
    this.itemSlot = page.locator('input[name="item"]'); // Añadí el slot para el ítem
    this.moves = {
      move1: page.locator('input[name="move1"]'),
      move2: page.locator('input[name="move2"]'),
      move3: page.locator('input[name="move3"]'),
      move4: page.locator('input[name="move4"]'),
    };
    this.evStatInputs = {
      hp: page.locator('input[name="stat-hp"]'),
      atk: page.locator('input[name="stat-atk"]'),
      def: page.locator('input[name="stat-def"]'),
      spa: page.locator('input[name="stat-spa"]'),
      spd: page.locator('input[name="stat-spd"]'),
      spe: page.locator('input[name="stat-spe"]'),
    };
    this.evStatPanel = page.locator('button[name="stats"]');
    this.backToTeamButton = page.locator('button[name="back"]');
    this.totalEv = page.locator('div.totalev em');
  }

  // Método para seleccionar un ítem
  async selectItem(itemName: string) {
    await this.itemSlot.click(); // Hacemos click en el slot del ítem
    await this.itemSlot.fill(itemName); // Rellenamos el campo con el nombre del ítem
    await this.page.keyboard.press('Enter'); // Confirmamos el ítem
  }

  // Método para seleccionar una habilidad
  async selectAbility(abilityName: string) {
    await this.abilitySlot.click(); // Hacemos click en el slot de la habilidad
    await this.abilitySlot.fill(abilityName); // Rellenamos el campo con el nombre de la habilidad
    await this.page.keyboard.press('Enter'); // Confirmamos la habilidad
  }

  // Método para seleccionar los movimientos
  async selectMoves(moves: string[]) {
    for (let i = 0; i < moves.length; i++) {
      const moveLocator = this.moves[`move${i + 1}`]; // Seleccionamos el input correspondiente al movimiento
      await moveLocator.click(); // Hacemos click en el campo de movimiento
      await moveLocator.fill(moves[i]); // Rellenamos con el nombre del movimiento
      await this.page.keyboard.press('Enter'); // Confirmamos el movimiento
    }
  }

  // Método para asignar los valores de los EVs
  async setEVStats(evStats: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number }) {
    await this.evStatPanel.click(); // Abrimos el panel de estadísticas
    // Asignamos los EVs para cada estadística
    for (const stat in evStats) {
      if (typeof evStats[stat] !== 'number') {
        throw new Error(`Expected ${stat} to be a number, but got ${typeof evStats[stat]}`);
      }
      await this.evStatInputs[stat].fill(evStats[stat].toString());
    }
  }

  // Método para verificar el conteo total de EVs
  async verifyTotalEvCount() {
    const totalEvText = await this.totalEv.textContent(); // Obtenemos el texto del total de EVs
    const totalEvValue = parseInt(totalEvText || '0', 10); // Convertimos el texto a número
    if (totalEvValue !== 510) { // Verificamos que el total sea 510, el máximo permitido
      throw new Error(`Total EV count is incorrect, expected 510 but got ${totalEvValue}`);
    }
  }

  // Método para regresar al equipo
  async goBackToTeam() {
    await this.backToTeamButton.click(); // Hacemos click en el botón para regresar al equipo
  }
}
