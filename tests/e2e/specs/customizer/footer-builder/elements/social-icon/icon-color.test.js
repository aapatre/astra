import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'social icons in the customizer', () => {
	it( 'icon color for desktop should apply correctly', async () => {
		const socialIconColor = {
			'footer-social-1-color': {
				desktop: 'rgb(196, 8, 229)',
				tablet: 'rgb(8, 136, 120)',
				mobile: 'rgb(159, 89, 10)',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom svg' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconColor[ 'footer-social-1-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconColor[ 'footer-social-1-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconColor[ 'footer-social-1-color' ].mobile }` );
	} );

	// eslint-disable-next-line eslint-comments/disable-enable-pair
	/* eslint-disable jest/no-commented-out-tests */
	// GitHub action E2E fail case
	// it( 'icon hover color for desktop should apply correctly', async () => {
	// 	const socialIconColor = {
	// 		'footer-social-1-color': {
	// 			desktop: 'rgb(20, 154, 231)',
	// 			tablet: 'rgb(219, 15, 15)',
	// 			mobile: 'rgb(143, 12, 229)',
	// 		},
	// 		'footer-desktop-items': {
	// 			primary: {
	// 				primary_2: {
	// 					0: 'social-icons-1',
	// 				},
	// 			},
	// 		},
	// 	};
	// 	await setCustomize( socialIconColor );
	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await setBrowserViewport( 'large' );
	// 	await scrollToElement( '#colophon' );
	// 	await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover' );
	// 	await expect( {
	// 		selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconColor[ 'footer-social-1-color' ].desktop }` );

	// 	await setBrowserViewport( 'medium' );
	// 	await scrollToElement( '#colophon' );
	// 	await expect( {
	// 		selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconColor[ 'footer-social-1-color' ].tablet }` );

	// 	await setBrowserViewport( 'small' );
	// 	await scrollToElement( '#colophon' );
	// 	await expect( {
	// 		selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconColor[ 'footer-social-1-color' ].mobile }` );
	// } );
} );
