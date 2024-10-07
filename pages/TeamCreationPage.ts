import { Page, expect } from '@playwright/test';

export class TeamCreationPage {
 
  private page: Page;
  private addPokemonButton;

  constructor(page: Page) {
    this.page = page;

    this.addPokemonButton = this.page.locator(`//div[@id='room-teambuilder']//ol/li[5]/button`);

  }

  async addPokemon(pokemonName: string) {
    await this.addPokemonButton.click();
    
    const inputLocator = this.page.locator(`//div[@id='room-teambuilder']//div[contains(@class, 'setcell-pokemon')]//input[@type='text' and @name='pokemon']`);
  
    await this.page.waitForTimeout(2000);
  
    await inputLocator.click();
  
    await this.page.keyboard.type(pokemonName, { delay: 100 });

    await this.page.keyboard.press('Enter');
  }

  async selectFormat(format: string, gen: string) {
    const inputLocator = this.page.locator(`//div[contains(@class, "popupmenu")]//ul/li/input[@name='inputName']`);
  
    await this.page.keyboard.type(format, { delay: 100 });

    const buttonLocator = this.page.locator(`//details//li/button[contains(@class, 'option') and text()="[${gen}] ${format}"]`);

    await buttonLocator.click();
  }

  // async validateTeam(format: string, gen: string) {
  //   await this.validateButton.click(); // Click en el botón de validar equipo
  //   await expect(this.page.locator('body')).toContainText(
  //     `Your team is valid for [${gen}] ${format}`
  //   ); // Verificamos que el mensaje de validación esté presente
  // }
}
