describe('Home Test', () => {
  it('test home page', () => {
    cy.visit('/')

    cy.get('h2').should('have.contain', '币价行情')

    cy.get('#selected_usd_price').should('have.contain', '$ 0.00')

    cy.get('select').select('ETH').should('have.value', 'ethereum')

    cy.get('#selected_usd_price').should('not.have.contain', '$ 0.00')
  })
})
