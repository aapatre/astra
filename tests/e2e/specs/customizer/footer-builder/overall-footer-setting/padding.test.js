import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'footer builder padding setting in customizer', () => {
	it( 'padding for desktop should apply correctly', async () => {
		const footerBuilderPadding = {
			'section-footer-builder-layout-padding': {
				desktop: {
					top: '80',
					right: '80',
					bottom: '80',
					left: '80',
				},
				'desktop-unit': 'px',
			},
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( footerBuilderPadding );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.site-footer' );

		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].desktop.top }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-footer',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].desktop.right }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-footer',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].desktop.bottom }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.site-footer',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].desktop.left }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'padding for tablet should apply correctly', async () => {
		const footerBuilderPadding = {
			'section-footer-builder-layout-padding': {
				tablet: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				'tablet-unit': 'px',
			},
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( footerBuilderPadding );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].tablet.top }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-footer',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].tablet.right }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-footer',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].tablet.bottom }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.site-footer',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].tablet.left }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'tablet-unit' ] }`,
		);
	} );

	it( 'padding for mobile should apply correctly', async () => {
		const footerBuilderPadding = {
			'section-footer-builder-layout-padding': {
				mobile: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
				},
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
		await setCustomize( footerBuilderPadding );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].mobile.top }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-footer',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].mobile.right }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-footer',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].mobile.bottom }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.site-footer',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ].mobile.left }${ footerBuilderPadding[ 'section-footer-builder-layout-padding' ][ 'mobile-unit' ] }`,
		);
	} );
} );
