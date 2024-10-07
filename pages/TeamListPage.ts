import { Page } from '@playwright/test';

export class TeamListPage {
  private page: Page;
  private createTeamButton;
  private teamList;
  private deleteTeamButton;
  private viewTeamButton;

  constructor(page: Page) {
    this.page = page;

    // Inicializamos los selectores para los elementos de la página
    this.createTeamButton = page.locator('button#create-team'); // Selector para el botón de crear equipo
    this.teamList = page.locator('.team-list'); // Selector para la lista de equipos
    this.deleteTeamButton = page.locator('button.delete-team'); // Selector para el botón de eliminar equipo
    this.viewTeamButton = page.locator('button.view-team'); // Selector para ver los detalles de un equipo
  }

  // Método para crear un nuevo equipo
  async createNewTeam() {
    await this.createTeamButton.click(); // Hacemos click en el botón de crear equipo
  }

  // Método para seleccionar un equipo de la lista por su nombre
  async selectTeam(teamName: string) {
    const team = this.page.locator(`.team-list-item:has-text("${teamName}")`);
    await team.click(); // Seleccionamos el equipo por su nombre
  }

  // Método para eliminar un equipo por su nombre
  async deleteTeam(teamName: string) {
    const team = this.page.locator(`.team-list-item:has-text("${teamName}")`);
    await team.locator('button.delete-team').click(); // Hacemos click en el botón de eliminar
    await this.page.locator('button.confirm-delete').click(); // Confirmamos la eliminación
  }

  // Método para ver los detalles de un equipo por su nombre
  async viewTeamDetails(teamName: string) {
    const team = this.page.locator(`.team-list-item:has-text("${teamName}")`);
    await team.locator('button.view-team').click(); // Hacemos click en el botón de ver detalles
  }
}
