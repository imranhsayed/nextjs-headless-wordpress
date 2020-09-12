import clientConfig from "../../src/client-config";

describe( 'Navigation', () => {
	describe( 'When you visit home', () => {

		it( 'Should visit home page', () => {
			cy.visit( clientConfig.devNextJsSiteURL )
		} );

		describe( 'nav', () => {
			it( 'Should about to navigate to About page', () => {
				cy.contains('About').click()
				cy.url().should('include', '/about')
			} )
		} )
	} )
} )
