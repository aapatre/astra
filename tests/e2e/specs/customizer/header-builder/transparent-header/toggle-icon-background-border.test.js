import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Transparent header settings in the customizer', () => {
	it( 'toggle icon color setting should apply correctly', async () => {
		const toggleIconColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-toggle-btn-color': 'rgb(18, 87, 5)',
		};
		await setCustomize( toggleIconColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .mobile-menu-toggle-icon .ast-mobile-svg' );
		await expect( {
			selector: '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .mobile-menu-toggle-icon .ast-mobile-svg',
			property: 'fill',
		} ).cssValueToBe( `${ toggleIconColor[ 'transparent-header-toggle-btn-color' ] }` );
	} );

	it( 'toggle background color setting should apply correctly', async () => {
		const toggleBackgroundColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'mobile-header-toggle-btn-style': 'fill',
			'transparent-header-toggle-btn-bg-color': 'rgb(227, 233, 252)',
		};
		await setCustomize( toggleBackgroundColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .ast-mobile-menu-trigger-fill' );
		await expect( {
			selector: '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .ast-mobile-menu-trigger-fill',
			property: 'background-color',
		} ).cssValueToBe( `${ toggleBackgroundColor[ 'transparent-header-toggle-btn-bg-color' ] }` );
	} );

	it( 'toggle border color setting should apply correctly', async () => {
		const toggleBorderColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'mobile-header-toggle-btn-style': 'outline',
			'transparent-header-toggle-border-color': 'rgb(192, 5, 86)',
		};
		await setCustomize( toggleBorderColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .ast-mobile-menu-trigger-outline' );
		await expect( {
			selector: '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .ast-mobile-menu-trigger-outline',
			property: 'border-color',
		} ).cssValueToBe( `${ toggleBorderColor[ 'transparent-header-toggle-border-color' ] }` );
	} );
} );
