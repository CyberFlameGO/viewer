/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

// Import font so CI has the same
import '!url-loader!style-loader!css-loader?fontsource-roboto'
import { randHash } from '../utils/'
const randUser = randHash()

describe('Open images in viewer', function() {
	before(function() {
		// Init user
		cy.nextcloudCreateUser(randUser, 'password')
		cy.login(randUser, 'password')

		// Upload test files
		cy.uploadFile('image1.jpg', 'image/jpeg')
		cy.uploadFile('image2.jpg', 'image/jpeg')
		cy.uploadFile('image3.jpg', 'image/jpeg')
		cy.uploadFile('image4.jpg', 'image/jpeg')
		cy.visit('/apps/files')

		// wait a bit for things to be settled
		cy.wait(1000)
	})
	after(function() {
		cy.logout()
	})

	it('See images in the list', function() {
		cy.get('#fileList tr[data-file="image1.jpg"]', { timeout: 10000 })
			.should('contain', 'image1.jpg')
		cy.get('#fileList tr[data-file="image2.jpg"]', { timeout: 10000 })
			.should('contain', 'image2.jpg')
		cy.get('#fileList tr[data-file="image3.jpg"]', { timeout: 10000 })
			.should('contain', 'image3.jpg')
		cy.get('#fileList tr[data-file="image4.jpg"]', { timeout: 10000 })
			.should('contain', 'image4.jpg')
	})

	it('Open the viewer on file click', function() {
		cy.openFile('image1.jpg')
		cy.get('#viewer-content').should('be.visible')
	})

	it('Does not see a loading animation', function() {
		cy.get('#viewer-content', { timeout: 10000 })
			.should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
	})

	it('See the menu icon and title on the viewer header', function() {
		cy.get('#viewer-content .modal-title').should('contain', 'image1.jpg')
		cy.get('#viewer-content .modal-header button.icon-menu-sidebar-white-forced').should('be.visible')
		cy.get('#viewer-content .modal-header button.icon-close').should('be.visible')
	})

	it('Does see next navigation arrows', function() {
		// only 2 because we don't know if we're at the end of the slideshow, current img and next one
		cy.get('#viewer-content .modal-container img').should('have.length', 2)
		cy.get('#viewer-content .modal-container img').should('have.attr', 'src')
		cy.get('#viewer-content a.next').should('be.visible')
		cy.get('#viewer-content a.next').should('be.visible')
	})

	it('Does not have any visual regression 1', function() {
		cy.compareSnapshot('images-1')
	})

	it('Show image2 on next', function() {
		cy.get('#viewer-content a.next').click()
		cy.get('#viewer-content .modal-container img').should('have.length', 3)
		cy.get('#viewer-content a.prev').should('be.visible')
		cy.get('#viewer-content a.next').should('be.visible')
	})

	it('Does not see a loading animation', function() {
		cy.get('#viewer-content', { timeout: 10000 })
			.should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
	})

	it('Does not have any visual regression 2', function() {
		cy.compareSnapshot('images-2')
	})

	it('Show image3 on next', function() {
		cy.get('#viewer-content a.next').click()
		cy.get('#viewer-content .modal-container img').should('have.length', 3)
		cy.get('#viewer-content a.prev').should('be.visible')
		cy.get('#viewer-content a.next').should('be.visible')
	})

	it('Does not see a loading animation', function() {
		cy.get('#viewer-content', { timeout: 10000 })
			.should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
	})

	it('Does not have any visual regression 3', function() {
		cy.compareSnapshot('images-3')
	})

	it('Show image4 on next', function() {
		cy.get('#viewer-content a.next').click()
		// only 2 because we don't know if we're at the end of the slideshow, current img and previous one
		cy.get('#viewer-content .modal-container img').should('have.length', 2)
		cy.get('#viewer-content a.prev').should('be.visible')
		cy.get('#viewer-content a.next').should('be.visible')
	})

	it('Does not see a loading animation', function() {
		cy.get('#viewer-content', { timeout: 10000 })
			.should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
	})

	it('Does not have any visual regression 4', function() {
		cy.compareSnapshot('images-4')
	})

	it('Show image1 again on next', function() {
		cy.get('#viewer-content a.next').click()
		cy.get('#viewer-content .modal-container img').should('have.length', 2)
		cy.get('#viewer-content a.prev').should('be.visible')
		cy.get('#viewer-content a.next').should('be.visible')
	})

	it('Does not see a loading animation', function() {
		cy.get('#viewer-content', { timeout: 10000 })
			.should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
	})

	it('Does not have any visual regression 5', function() {
		cy.compareSnapshot('images-5')
	})
})
