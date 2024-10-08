import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class TeamCreationPage extends BasePage {
  private addPokemonButton;
  private okButton;
  private validateButton;


  constructor(page) {
    super(page);
    this.addPokemonButton = this.page.locator(`button[name="addPokemon"]`);
    this.okButton = this.page.locator('button[name="close"]');
    this.validateButton = this.page.locator('button[name="validate"]');
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
    // Clic en el botón "Validate"
    await this.clickElement(this.validateButton);
    
    // Esperar a que aparezca la ventana emergente con el resultado de la validación
    const validationMessage = this.page.locator('//P[contains(text(), "Your team is valid for")]');
    
    await validationMessage.waitFor({ state: 'visible', timeout: 5000 });

    // Verificar que el mensaje de validación contenga la palabra "valid" para confirmar que el equipo es válido
    await expect(validationMessage).toContainText('valid');
    
    // Clic en el botón "OK" para cerrar la ventana emergente (si es necesario)
    await this.clickElement(this.okButton);
}
}