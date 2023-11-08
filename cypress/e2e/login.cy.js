/**
 * - Login spec
 *   - should display login page correctly
 *   - should display error when username is empty
 *   - should display error when password is empty
 *   - should display error when username and password are wrong
 *   - should display dashboard when username and password are correct
 */
require('core-js/actual/array/group-by');

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="your@email.com"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });
  it('should display error when username is empty', () => {
    // klik tombol login tanpa mengisi username
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi error untuk tampil dan menampilkan pesan error dari api
    cy.get('[id=error-content]').should('exist').and('have.html', '"email" is not allowed to be empty');
  });
  it('should display error when password is empty', () => {
    // mengisi username
    cy.get('input[placeholder="your@email.com"]').type('testuser@test.com');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi error untuk tampil dan menampilkan pesan error dari api
    cy.get('[id=error-content]').should('exist').and('have.html', '"password" is not allowed to be empty');
  });
  it('should display error when username and password are wrong', () => {
    // mengisi username
    cy.get('input[placeholder="your@email.com"]').type('muhammadwildaniskandat@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi error untuk tampil dan menampilkan pesan error dari api
    cy.get('[id=error-content]').should('exist').and('have.html', 'email or password is wrong');
  });
  it('should display dashboard when username and password are correct', () => {
    // mengisi username
    cy.get('input[placeholder="your@email.com"]').type('muhammadwildaniskandar@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="password"]').type('apaxmaksud?');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi bahwa elemen yang berada di dashboard ditampilkan
    cy.get('nav').should('exist');
    cy.get('[id="main-menu"]').should('exist');
  });
});
