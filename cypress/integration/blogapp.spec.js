/// <reference types="Cypress" />

describe('Blog app login page', () => {
  beforeEach(() => {
    const user = {
      'password': 'passu',
      'username': 'juuseri',
      'name': 'Heavy Juuseri'
    }
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  // https://on.cypress.io/interacting-with-elements

  it('show login page', () => {
    cy.contains('login')
  })
})
describe('Logged in to Blog app', () => {
  beforeEach(() => {
    const user = {
      'password': 'passu',
      'username': 'juuseri',
      'name': 'Heavy Juuseri'
    }
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
    cy.contains('login')
      .click()
    cy.get('#username')
      .type('juuseri')
    cy.get('#password')
      .type('passu')
    cy.contains('login')
      .click()
  })
  it('user can login', function () {
    cy.contains('juuseri logged in')
  })
})
describe('New blog', () => {
  beforeEach(() => {
    const user = {
      'password': 'passu',
      'username': 'juuseri',
      'name': 'Heavy Juuseri'
    }
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
    cy.contains('login')
      .click()
    cy.get('#username')
      .type('juuseri')
    cy.get('#password')
      .type('passu')
    cy.contains('login')
      .click()
    cy.contains('add new blog')
      .click()
    cy.get('#titleInput').type('Uusi tosi hyvä blogi')
    cy.get('#authorInput').type('Juho')
    cy.get('#urlInput').type('localhost')
    cy.get('#addBlog').click()
  })
  it('add new blog', () => {
    cy.contains('Uusi tosi hyvä blogi')
  })
  it('like new blog', () => {
    cy.contains('Uusi tosi hyvä blogi').click()
    cy.contains('0 likes')
    cy.get('#likeBlog').click()
    cy.contains('1 likes')
  })
  it('add a comment to the blog', () => {
    cy.contains('Uusi tosi hyvä blogi').click()
    cy.get('#commentInput').type('paras blogi ever')
    cy.get('#addComment').click()
    cy.contains('paras blogi ever')
  })
})
