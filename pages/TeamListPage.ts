import { Page } from '@playwright/test';

export class TeamListPage {
  private page: Page;
  private createTeamButton;
  private secondButtonXPath;

  constructor(page: Page) {
    this.page = page;

    this.createTeamButton = page.locator('//div[@id="room-teambuilder"]//button[contains(text(), "New Team")]'); 
  
    this.secondButtonXPath = page.locator('//div[@id="room-teambuilder"]//ol/li[2]//button[1]');
  }

  async createNewTeam() {
    await this.createTeamButton.click(); 

    await this.secondButtonXPath.click();
  }

}
