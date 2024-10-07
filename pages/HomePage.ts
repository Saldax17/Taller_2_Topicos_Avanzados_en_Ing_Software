import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;
  private teamBuilderButtonXPath: string;
  private loginButtonXPath: string;

  constructor(page: Page) {
    // Inicializamos la página
    this.page = page;

    // Inicializamos los selectores de los elementos de la página
    this.teamBuilderButtonXPath = "//div[@id='room-']//button[contains(text(), 'Teambuilder')]";
  }

 async navigate() {
  await this.page.goto('https://play.pokemonshowdown.com/');
  }


  // Método para abrir el Team Builder desde la página de inicio
  async openTeamBuilder() {
  
    await this.page.click(this.teamBuilderButtonXPath);
  }

}
