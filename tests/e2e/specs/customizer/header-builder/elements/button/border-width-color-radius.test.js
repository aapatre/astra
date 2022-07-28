import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Header builder button setting in customizer', () => {
	it( 'border width, color and radius should apply correctly', async () => {
		const buttonBorder = {
			'header-button1-border-color': {
				desktop: 'rgb(239, 172, 172)',
				tablet: 'rgb(215, 242, 169)',
				mobile: 'rgb(225, 184, 239)',
			},
			'header-button1-border-radius': 60,
			'header-button1-border-size': {
				top: '80',
				right: '70',
				bottom: '60',
				left: '50',
			},
			'header-desktop-items': {
				above: {
					above_center: {
						0: 'button-1',
					},
				},
			},
			'header-mobile-items': {
				above: {
					above_center: {
						0: 'button-1',
					},
				},
			},
		};
		await setCustomize( buttonBorder );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		// Border width
		await page.waitForSelector( '.ast-header-button-1 .ast-custom-button' );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'border-top-width',
		} ).cssValueToBe( `${ buttonBorder[ 'header-button1-border-size' ].top + 'px' }` );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'border-right-width',
		} ).cssValueToBe( `${ buttonBorder[ 'header-button1-border-size' ].right + 'px' }` );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'border-bottom-width',
		} ).cssValueToBe( `${ buttonBorder[ 'header-button1-border-size' ].bottom + 'px' }` );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'border-left-width',
		} ).cssValueToBe( `${ buttonBorder[ 'header-button1-border-size' ].left + 'px' }` );

		// Border radius
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'border-radius',
		} ).cssValueToBe( `${ buttonBorder[ 'header-button1-border-radius' ] + 'px' }` );

		// Border color
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'border-color',
		} ).cssValueToBe( `${ buttonBorder[ 'header-button1-border-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'border-color',
		} ).cssValueToBe( `${ buttonBorder[ 'header-button1-border-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'border-color',
		} ).cssValueToBe( `${ buttonBorder[ 'header-button1-border-color' ].mobile }` );
	} );
} );
