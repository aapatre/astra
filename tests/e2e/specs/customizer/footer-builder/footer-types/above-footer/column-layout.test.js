import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer column and layout setting in customizer', () => {
	it( 'layout should apply correctly', async () => {
		const aboveFooterLayout = {
			'hba-footer-layout': {
				desktop: '2-equal',
				tablet: '2-equal',
				mobile: 'full',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( aboveFooterLayout );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap' );
		const desktopLayout = await page.$eval( '.site-above-footer-wrap', ( element ) => element.getAttribute( '.ast-builder-grid-row-2-equal' ) );
		await expect( desktopLayout ).toBeNull();

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap' );
		const tabletLayout = await page.$eval( '.site-above-footer-wrap', ( element ) => element.getAttribute( '.ast-builder-grid-row-tablet-2-equal' ) );
		await expect( tabletLayout ).toBeNull();

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap' );
		const mobileLayout = await page.$eval( '.site-above-footer-wrap', ( element ) => element.getAttribute( '.ast-builder-grid-row-mobile-full' ) );
		await expect( mobileLayout ).toBeNull();
	} );

	it( 'column should apply correctly', async () => {
		const aboveFooterColumn = {
			'hba-footer-column': '2',
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( aboveFooterColumn );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap' );
		const Column = await page.$eval( '.site-above-footer-wrap', ( element ) => element.getAttribute( '.ast-builder-grid-row-2-equal .ast-builder-grid-row' ) );
		await expect( Column ).toBeNull();
	} );
} );
