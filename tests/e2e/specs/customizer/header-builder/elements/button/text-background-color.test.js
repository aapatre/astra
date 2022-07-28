import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Header builder button setting in customizer', () => {
	it( 'text and background color should apply correctly', async () => {
		const buttonColor = {
			'header-button1-text-color': {
				desktop: 'rgb(230, 12, 12)',
				tablet: 'rgb(76, 145, 13)',
				mobile: 'rgb(105, 12, 12)',
			},
			'header-button1-back-color': {
				desktop: 'rgb(230, 188, 230)',
				tablet: 'rgb(243, 239, 217)',
				mobile: 'rgb(230, 188, 230)',
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
		await setCustomize( buttonColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		// Text-color
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'color',
		} ).cssValueToBe( `${ buttonColor[ 'header-button1-text-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'color',
		} ).cssValueToBe( `${ buttonColor[ 'header-button1-text-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'color',
		} ).cssValueToBe( `${ buttonColor[ 'header-button1-text-color' ].mobile }` );

		//Background color
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'background-color',
		} ).cssValueToBe( `${ buttonColor[ 'header-button1-back-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'background-color',
		} ).cssValueToBe( `${ buttonColor[ 'header-button1-back-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-button-1 .ast-custom-button',
			property: 'background-color',
		} ).cssValueToBe( `${ buttonColor[ 'header-button1-back-color' ].mobile }` );
	} );
} );
