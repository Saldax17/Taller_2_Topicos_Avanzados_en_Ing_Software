import { Page, expect } from '@playwright/test';

export class TeamCreationPage {
  // Definimos las propiedades de la clase pero sin inicializarlas aún
  private page: Page;
  private addPokemonButton;
  private pokemonSearchBox;
  private validateButton;
  private formatSelect;
  private genSelect;

  constructor(page: Page) {
    // Inicializamos la página
    this.page = page;

    // Ahora inicializamos los selectores después de que 'page' esté disponible
    this.addPokemonButton = this.page.locator('#add-pokemon-button');
    this.pokemonSearchBox = this.page.locator('#pokemon-search-box');
    this.validateButton = this.page.locator('#validate-button');
    this.formatSelect = this.page.locator('#format-select');
    this.genSelect = this.page.locator('#gen-select');
  }

  // Método para añadir un Pokémon al equipo
  async addPokemon(pokemonName: string) {
    await this.addPokemonButton.click(); // Click en el botón de agregar Pokémon
    await this.pokemonSearchBox.click(); // Click en el campo de búsqueda
    await this.pokemonSearchBox.fill(pokemonName); // Escribimos el nombre del Pokémon
    await this.page.locator(`a[data-entry="pokemon|${pokemonName}"]`).click(); // Selección del Pokémon
  }

  // Método para seleccionar el formato y la generación del equipo
  async selectFormat(format: string, gen: string) {
    // Seleccionar formato
    await this.formatSelect.click();
    await this.page.locator(`option[value="${format}"]`).click();

    // Seleccionar generación
    await this.genSelect.click();
    await this.page.locator(`option[value="${gen}"]`).click();
  }

  // Método para validar que el equipo sea correcto para el formato y generación
  async validateTeam(format: string, gen: string) {
    await this.validateButton.click(); // Click en el botón de validar equipo
    await expect(this.page.locator('body')).toContainText(
      `Your team is valid for [${gen}] ${format}`
    ); // Verificamos que el mensaje de validación esté presente
  }
}
