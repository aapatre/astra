import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Primary footer margin setting in customizer', () => {
	it( 'margin should apply correctly', async () => {
		const primaryFooterMargin = {
			'section-primary-footer-builder-margin': {
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
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( primaryFooterMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-top',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].desktop.top }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-right',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].desktop.right }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].desktop.bottom }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-left',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].desktop.left }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-top',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].tablet.top }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-right',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].tablet.right }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].tablet.bottom }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-left',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].tablet.left }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-top',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].mobile.top }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-right',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].mobile.right }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].mobile.bottom }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'margin-left',
		} ).cssValueToBe( `${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ].mobile.left }${ primaryFooterMargin[ 'section-primary-footer-builder-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );
