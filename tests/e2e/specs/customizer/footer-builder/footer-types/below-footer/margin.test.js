import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Below footer margin setting in customizer', () => {
	it( 'margin should apply correctly', async () => {
		const belowFooterMargin = {
			'section-below-footer-builder-margin': {
				desktop: {
					top: '80',
					right: '80',
					bottom: '80',
					left: '80',
				},
				tablet: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				mobile: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( belowFooterMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-top',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].desktop.top }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-right',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].desktop.right }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].desktop.bottom }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-left',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].desktop.left }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-top',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].tablet.top }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-right',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].tablet.right }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].tablet.bottom }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-left',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].tablet.left }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-top',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].mobile.top }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-right',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].mobile.right }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].mobile.bottom }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'margin-left',
		} ).cssValueToBe( `${ belowFooterMargin[ 'section-below-footer-builder-margin' ].mobile.left }${ belowFooterMargin[ 'section-below-footer-builder-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );
