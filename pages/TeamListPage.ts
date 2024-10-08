import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class TeamListPage extends BasePage {
  private createTeamButton;
  private secondButtonXPath;

  constructor(page) {
    super(page);
    this.createTeamButton = page.locator('//div[@id="room-teambuilder"]//button[contains(text(), "New Team")]');
    this.secondButtonXPath = page.locator('//div[@id="room-teambuilder"]//ol/li[2]//button[1]');
  }

  async createNewTeam(): Promise<void> {
    await this.clickElement(this.createTeamButton);
    await this.clickElement(this.secondButtonXPath);
  }

  async validateTeamPresence(): Promise<void> {
    const teamExists = this.page.locator('//div[@id="room-teambuilder"]//ol/li[2]//button[1]');
    await expect(teamExists).toBeVisible();
  }
}