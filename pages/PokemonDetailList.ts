import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class PokemonDetailsPage extends BasePage {
  private abilitySlot;
  private ivSpreadDropdown;
  private moves;
  private evStatInputs;
  private evStatPanel;
  private backToTeamButton;
  private totalEv;
  private itemSlot;

  constructor(page: Page) {
    super(page);
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
    this.backToTeamButton = page.locator('div.teamwrapper div.pad button[name="back"]');
    this.totalEv = page.locator('div.totalev em');
  }

  async selectItem(itemName: string): Promise<void> {
    await this.clickElement(this.itemSlot);
    await this.fillInput(this.itemSlot, itemName);
    await this.page.keyboard.press('Enter');
  }

  async selectAbility(abilityName: string): Promise<void> {
    await this.clickElement(this.abilitySlot);
    await this.fillInput(this.abilitySlot, abilityName);
    await this.page.keyboard.press('Enter');
  }

  async selectMoves(moves: { move1: string; move2: string; move3: string; move4: string }): Promise<void> {
    for (let i = 1; i <= 4; i++) {
      const moveLocator = this.moves[`move${i}`];
      await this.clickElement(moveLocator);
      await this.fillInput(moveLocator, moves[`move${i}`]);
      await this.page.keyboard.press('Enter');
    }
  }

  async setEVStats(evStats: { hp: string; atk: string; def: string; spa: string; spd: string; spe: string }): Promise<void> {
    await this.clickElement(this.evStatPanel);
    for (const stat in evStats) {
      await this.fillInput(this.evStatInputs[stat], evStats[stat]);
    }
  }

  async verifyTotalEvCount(): Promise<number> {
    const totalEvText = await this.totalEv.textContent();
    const totalEvValue = parseInt(totalEvText || '0', 10);
    if (totalEvValue !== 0) {
      console.error(`Total EV count is incorrect, expected 0 but got ${totalEvValue}`);
    }
    return totalEvValue;
  }

  async goBackToTeam(): Promise<void> {
    await this.clickElement(this.backToTeamButton);
  }
}
