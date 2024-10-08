import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private teamBuilderButtonXPath: string;
  private readonly url: string = 'https://play.pokemonshowdown.com/';

  constructor(page) {
    super(page);
    this.teamBuilderButtonXPath = "//div[@id='room-']//button[contains(text(), 'Teambuilder')]";
  }

  async navigate(): Promise<void> {
    await this.navigateTo(this.url);
  }

  async openTeamBuilder(): Promise<void> {
    if (await this.isVisible(this.teamBuilderButtonXPath)) {
      await this.clickElement(this.teamBuilderButtonXPath);
    } else {
      throw new Error("Team Builder Button is not visible");
    }
  }
}