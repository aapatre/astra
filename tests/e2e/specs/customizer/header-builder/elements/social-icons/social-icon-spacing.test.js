import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Social icon in the customizer', () => {
	it( 'social icon spacing should apply correctly', async () => {
		const socialIconSpacing = {
			'header-social-1-space': {
				desktop: '50',
				tablet: '40',
				mobile: '30',
			},
			'desktop-unit': 'px',
			'header-desktop-items': {
				above: {
					above_center: {
						0: 'social-icons-1',

					},
				},
			},
			'header-mobile-items': {
				above: {
					above_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialIconSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `25px` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `20px` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `15px` );
	} );
} );
