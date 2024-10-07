import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;
  private teamBuilderButton;
  private loginButton;

  constructor(page: Page) {
    // Inicializamos la página
    this.page = page;

    // Inicializamos los selectores de los elementos de la página
    this.teamBuilderButton = page.locator('button#team-builder'); // Selector para el botón del Team Builder
    this.loginButton = page.locator('button#login'); // Selector para el botón de login (opcional)
  }

  // Método para navegar a la página de inicio
  async navigate() {
    await this.page.goto('https://tu-aplicacion.com/home'); // Cambia la URL por la de tu aplicación
  }

  // Método para abrir el Team Builder desde la página de inicio
  async openTeamBuilder() {
    await this.teamBuilderButton.click(); // Hacemos click en el botón de Team Builder
  }

  // Método opcional para iniciar sesión
  async login(username: string, password: string) {
    await this.loginButton.click(); // Abrimos el formulario de inicio de sesión
    await this.page.fill('input[name="username"]', username); // Rellenamos el campo de usuario
    await this.page.fill('input[name="password"]', password); // Rellenamos el campo de contraseña
    await this.page.click('button#submit-login'); // Hacemos click en el botón de iniciar sesión
  }
}
