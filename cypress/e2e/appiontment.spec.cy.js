/// <reference types="cypress"/>

describe("testing appointment page", () => {
    beforeEach(() => {
        cy.visit("/appointment")
    })

    it("check button first", () => {
        cy.get("#list").children().should('have.length', 6)
        cy.get("#list > :nth-child(1) label").click()
    })
})