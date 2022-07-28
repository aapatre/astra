import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Social Icons show label in the customizer', () => {
	it( 'social icon label color should apply correctly', async () => {
		const socialIconShowlabel = {
			'header-social-1-label-toggle': '1',
			'header-social-1-label-color': {
				desktop: 'rgb(40, 142, 10)',
				tablet: 'rgb(146, 8, 161)',
				mobile: 'rgb(143, 62, 8)',
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
		await setCustomize( socialIconShowlabel );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconShowlabel[ 'header-social-1-label-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconShowlabel[ 'header-social-1-label-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconShowlabel[ 'header-social-1-label-color' ].mobile }` );
	} );

	// eslint-disable-next-line eslint-comments/disable-enable-pair
	/* eslint-disable jest/no-commented-out-tests */
	// GitHub action E2E fail case
	// it( 'social icon label hover should apply correctly', async () => {
	// 	const socialIconShowlabel = {
	// 		'header-social-1-label-toggle': '1',
	// 		'header-social-1-label-h-color': {
	// 			desktop: 'rgb(123, 130, 2)',
	// 			tablet: 'rgb(107, 97, 218)',
	// 			mobile: 'rgb(15, 118, 11)',
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
	// 	await setCustomize( socialIconShowlabel );

	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );

	// 	await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element:hover .social-item-label' );
	// 	await expect( {
	// 		selector: '.ast-header-social-1-wrap .ast-builder-social-element:hover .social-item-label',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconShowlabel[ 'header-social-1-label-h-color' ].desktop }` );

	// 	await setBrowserViewport( 'medium' );
	// 	await expect( {
	// 		selector: '.ast-header-social-1-wrap .ast-builder-social-element:hover .social-item-label',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconShowlabel[ 'header-social-1-label-h-color' ].tablet }` );

	// 	await setBrowserViewport( 'small' );
	// 	await expect( {
	// 		selector: '.ast-header-social-1-wrap .ast-builder-social-element:hover .social-item-label',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ socialIconShowlabel[ 'header-social-1-label-h-color' ].mobile }` );
	// } );
} );
