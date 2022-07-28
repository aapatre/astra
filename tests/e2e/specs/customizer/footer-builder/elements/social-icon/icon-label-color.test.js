import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Social icons show label in the customizer', () => {
	it( 'icon label color for desktop should apply correctly', async () => {
		const socialIconLabelColor = {
			'footer-social-1-label-toggle': '1',
			'footer-social-1-label-color': {
				desktop: 'rgb(118, 65, 4)',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconLabelColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-color' ].desktop }` );
	} );

	// eslint-disable-next-line eslint-comments/disable-enable-pair
	/* eslint-disable jest/no-commented-out-tests */
	// GitHub action E2E fail case
	// it( 'icon label color for tablet should apply correctly', async () => {
	// 	const socialIconLabelColor = {
	// 		'footer-social-1-label-toggle': '1',
	// 		'footer-social-1-label-color': {
	// 			tablet: 'rgb(75, 44, 69)',
	// 		},
	// 		'footer-desktop-items': {
	// 			primary: {
	// 				primary_2: {
	// 					0: 'social-icons-1',
	// 				},
	// 			},
	// 		},
	// 	};
	// 	await setCustomize( socialIconLabelColor );
	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await setBrowserViewport( 'medium' );
	// 	await scrollToElement( '#colophon' );
	// 	await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label' );
	// 	await expect( {
	// 		selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-color' ].tablet }` );
	// } );

	// it( 'icon label color for mobile should apply correctly', async () => {
	// 	const socialIconLabelColor = {
	// 		'footer-social-1-label-toggle': '1',
	// 		'footer-social-1-label-color': {
	// 			mobile: 'rgb(55, 61, 56)',
	// 		},
	// 		'footer-desktop-items': {
	// 			primary: {
	// 				primary_2: {
	// 					0: 'social-icons-1',
	// 				},
	// 			},
	// 		},
	// 	};
	// 	await setCustomize( socialIconLabelColor );
	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await setBrowserViewport( 'small' );
	// 	await scrollToElement( '#colophon' );
	// 	await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label' );
	// 	await expect( {
	// 		selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .social-item-label',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconLabelColor[ 'footer-social-1-label-color' ].mobile }` );
	// } );
} );
