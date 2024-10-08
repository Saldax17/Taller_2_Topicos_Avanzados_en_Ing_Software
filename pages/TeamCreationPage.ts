import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class TeamCreationPage extends BasePage {
  private addPokemonButton;

  constructor(page) {
    super(page);
    this.addPokemonButton = this.page.locator(`button[name="addPokemon"]`);
  }

  async addPokemon(pokemonName: string): Promise<void> {
    await this.clickElement(this.addPokemonButton);
    
    const inputLocator = this.page.locator(`//div[@id='room-teambuilder']//div[contains(@class, 'setcell-pokemon')]//input[@type='text' and @name='pokemon']`);
    await this.waitForSelector(inputLocator);

    await this.clickElement(inputLocator);
    await this.page.keyboard.type(pokemonName, { delay: 100 });
    await this.page.keyboard.press('Enter');
  }

  async selectFormat(format: string, gen: string): Promise<void> {
    const inputLocator = this.page.locator(`//div[contains(@class, "popupmenu")]//ul/li/input[@name='inputName']`);
    await this.page.keyboard.type(format, { delay: 100 });

    const buttonLocator = this.page.locator(`//details//li/button[contains(@class, 'option') and text()="[${gen}] ${format}"]`);
    await this.clickElement(buttonLocator);
  }

  async validateTeamCreation(format: string, gen: string): Promise<void> {
    const teamNameElement = this.page.locator(`//div[@id="room-teambuilder"]//span[contains(text(), "[${gen}] ${format}")]`);
    await expect(teamNameElement).toBeVisible();
  }
}