import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Social icons in the customizer', () => {
	it( 'social icon hide on tablet should apply correctly', async () => {
		const hideOnTablet = {
			'section-hb-social-icons-1-hide-tablet': {
				tablet: 1,
			},
			'header-mobile-items': {
				above: {
					above_center: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideOnTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-header-break-point .ast-builder-layout-element[data-section="section-hb-social-icons-1"]' );
		const tablet = await page.$eval( '.ast-header-break-point .ast-builder-layout-element[data-section="section-hb-social-icons-1"]', ( element ) => element.getAttribute( '.ast-builder-layout-element ast-flex site-header-focus-item' ) );
		await expect( tablet ).toBeNull( );
	} );

	it( 'social icon hide on mobile should apply correctly', async () => {
		const hideOnMobile = {
			'section-hb-social-icons-1-hide-mobile': {
				mobile: 1,
			},
			'header-mobile-items': {
				above: {
					above_center: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideOnMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-header-break-point .ast-builder-layout-element[data-section="section-hb-social-icons-1"]' );
		const mobile = await page.$eval( '.ast-header-break-point .ast-builder-layout-element[data-section="section-hb-social-icons-1"]', ( element ) => element.getAttribute( '.ast-builder-layout-element ast-flex site-header-focus-item' ) );
		await expect( mobile ).toBeNull( );
	} );
} );
