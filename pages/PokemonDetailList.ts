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

    this.abilitySlot = page.locator('input[name="ability"]');
    this.ivSpreadDropdown = page.locator('select[name="ivspread"]');
    this.itemSlot = page.locator('input[name="item"]');
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

  async selectItem(itemName: string) {
    await this.itemSlot.click(); 
    await this.itemSlot.fill(itemName); 
    await this.page.keyboard.press('Enter'); 
  }

  async selectAbility(abilityName: string) {
    await this.abilitySlot.click(); 
    await this.abilitySlot.fill(abilityName); 
    await this.page.keyboard.press('Enter'); 
  }

  async selectMoves(moves: { move1: string; move2: string; move3: string; move4: string }) {
    for (let i = 1; i <= 4; i++) {
      const moveLocator = this.moves[`move${i}`]; 
      await moveLocator.click();
      await moveLocator.fill(moves[`move${i}`]); 
      await this.page.keyboard.press('Enter');
    }
  }
  

async setEVStats(evStats: { hp: string; atk: string; def: string; spa: string; spd: string; spe: string }) {
  await this.evStatPanel.click(); 

  for (const stat in evStats) {

    if (typeof evStats[stat] !== 'string') {
      throw new Error(`Expected ${stat} to be a string, but got ${typeof evStats[stat]}`);
    }

    await this.evStatInputs[stat].fill(evStats[stat]);
  }
}

  async verifyTotalEvCount() {
    const totalEvText = await this.totalEv.textContent(); 
    const totalEvValue = parseInt(totalEvText || '0', 10); 
    if (totalEvValue !== 510) { 
      throw new Error(`Total EV count is incorrect, expected 510 but got ${totalEvValue}`);
    }
  }

  async goBackToTeam() {
    await this.backToTeamButton.click(); 
  }
}
