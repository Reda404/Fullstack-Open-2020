describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'reda404',
      password: 'aaa',
      name: 'julien',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('show login form by default', function () {
    cy.contains('log in to app')
  })

  it('login with correct credentials', function () {
    cy.get('#username').type('reda404')
    cy.get('#password').type('aaa')
    cy.get('button').contains('login').click()
    cy.contains('julien logged in')
  })

  it('do not login with incorrect credentials', function () {
    cy.get('#username').type('reda404')
    cy.get('#password').type('wrong')
    cy.get('button').contains('login').click()
    cy.contains('log in to app')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'reda404',
        password: 'aaa',
      }).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('user can add blog', function () {
      cy.contains('new note').click()
      cy.get('#title').type('test')
      cy.get('#author').type('test')
      cy.get('#url').type('test')
      cy.get('button').contains('create').click()
      cy.contains('test test')
    })
  })
})
