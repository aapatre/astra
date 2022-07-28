import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'HTML 1 widget margin in the above header section under the customizer', () => {
	it( 'html1 widget margin for desktop should apply correctly', async () => {
		const htmlMargin = {
			'header-html-1': '<a href="https://wpastra.com/">HTML 1 margin</a>',
			'section-hb-html-1-margin': {
				desktop: {
					top: 80,
					right: 80,
					bottom: 80,
					left: 80,
				},
				tablet: {
					top: 60,
					right: 60,
					bottom: 60,
					left: 60,
				},
				mobile: {
					top: 40,
					right: 40,
					bottom: 40,
					left: 40,
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'html-1',
					},
				},
			},
			'header-mobile-items': {
				above: {
					above_left: {
						0: 'html-1',
					},
				},
			},
		};
		await setCustomize( htmlMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-1' );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-top',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].desktop.top }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-right',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].desktop.right }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].desktop.bottom }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-left',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].desktop.left }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-top',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].tablet.top }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-right',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].tablet.right }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].tablet.bottom }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-left',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].tablet.left }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-top',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].mobile.top }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-right',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].mobile.right }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].mobile.bottom }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-html-1',
			property: 'margin-left',
		} ).cssValueToBe( `${ htmlMargin[ 'section-hb-html-1-margin' ].mobile.left }${ htmlMargin[ 'section-hb-html-1-margin' ][ 'mobile-unit' ] }` );
	} );
} );
