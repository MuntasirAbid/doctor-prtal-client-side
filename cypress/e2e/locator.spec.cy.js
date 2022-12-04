/// <reference types="cypress"/>

describe("Locators", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('going to home page', () => {
        cy.get('button')
    })

    it("will go to login page and will login with email and pass", () => {
        cy.contains('Login').click({ force: true })
        cy.get("[type='text']").type("m@gmail.com")
        cy.get("[type='password']").type("AA1122")
        cy.get("[type='Submit']").click()

    })
})


