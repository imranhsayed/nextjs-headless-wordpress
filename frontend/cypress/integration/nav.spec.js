describe('Nav Menus', () => {

    // For desktop view
    context('720p resolution', () => {
        beforeEach(() => {
            /**
             * Run these tests as if in a desktop browser,
             * with a 720p monitor
             */
            cy.viewport(1280, 720)
        })

        describe( 'When you visit home', () => {

            it( 'Should visit home page', () => {
                cy.visit( '/' )
            } );

            describe( 'nav', () => {
                it( 'Should about to navigate to About page', () => {
                    cy.get('[data-cy=nav-item]').contains('About').click()
                    cy.url().should('include', '/about')
                } )
            } )
        } )
    })

    context('iphone-5 resolution', () => {
        beforeEach(() => {
            /**
             * Run these tests as if in a desktop browser,
             * with a 720p monitor
             */
            cy.viewport('iphone-5')
        })

        describe( 'When you visit home', () => {

            it( 'Should visit home page', () => {
                cy.visit( '/' )
            } );

            describe( 'Mmenu', () => {
                it( 'Should open the mmenu', () => {
                    cy.get('[data-cy=mmenu-btn]').click();
                } )

                describe( 'nav', () => {
                    it( 'Should about to navigate to About page', () => {
                        cy.get('[data-cy=nav-item]').contains('About').click()
                        cy.url().should('include', '/about')
                    } )
                } )
            } )
        } )
    })
})
