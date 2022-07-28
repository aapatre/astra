import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon background color should apply correctly', async () => {
		const backgroundColor = {
			'header-social-1-bg-color': {
				desktop: 'rgb(221, 230, 176)',
				tablet: 'rgb(228, 167, 230)',
				mobile: 'rgb(164, 231, 204)',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( backgroundColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'header-social-1-bg-color' ].desktop }` );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element' );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'header-social-1-bg-color' ].tablet }` );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element' );
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'header-social-1-bg-color' ].mobile }` );
	} );

	// eslint-disable-next-line eslint-comments/disable-enable-pair
	/* eslint-disable jest/no-commented-out-tests */
	// GitHub action E2E fail case
	// it( 'social icon background hover color should apply correctly', async () => {
	// 	const backgroundColor = {
	// 		'header-social-1-bg-h-color': {
	// 			desktop: 'rgb(213, 191, 134)',
	// 			tablet: 'rgb(228, 167, 230)',
	// 			mobile: 'rgb(164, 231, 204)',
	// 		},
	// 		'header-desktop-items': {
	// 			primary: {
	// 				primary_center: {
	// 					0: 'social-icons-1',

	// 				},
	// 			},
	// 		},
	// 		'header-mobile-items': {
	// 			primary: {
	// 				primary_center: {
	// 					0: 'social-icons-1',

	// 				},
	// 			},
	// 		},
	// 	};
	// 	await setCustomize( backgroundColor );

	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );

	// 	await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover' );
	// 	await expect( {
	// 		selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover',
	// 		property: 'background-color',
	// 	} ).cssValueToBe( `${ backgroundColor[ 'header-social-1-bg-h-color' ].desktop }` );

	// 	await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element' );
	// 	await setBrowserViewport( 'medium' );
	// 	await expect( {
	// 		selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover',
	// 		property: 'background-color',
	// 	} ).cssValueToBe( `${ backgroundColor[ 'header-social-1-bg-h-color' ].tablet }` );

	// 	await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element:hover' );
	// 	await setBrowserViewport( 'small' );
	// 	await expect( {
	// 		selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element',
	// 		property: 'background-color',
	// 	} ).cssValueToBe( `${ backgroundColor[ 'header-social-1-bg-h-color' ].mobile }` );
	// } );
} );
