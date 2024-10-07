import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;
  private teamBuilderButtonXPath: string;
  private loginButtonXPath: string;

  constructor(page: Page) {

    this.page = page;

    this.teamBuilderButtonXPath = "//div[@id='room-']//button[contains(text(), 'Teambuilder')]";
  }

 async navigate() {
  await this.page.goto('https://play.pokemonshowdown.com/');
  }

  async openTeamBuilder() {
  
    await this.page.click(this.teamBuilderButtonXPath);
  }

}
