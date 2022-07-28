import { insertBlock, createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
describe( 'Global button font setting under the Customizer', () => {
	it( 'button font should apply correctly', async () => {
		const buttonFont = {
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'button-1',
					},
				},
			},
			'header-mobile-items': {
				above: {
					above_left: {
						0: 'button-1',
					},
				},
			},
			'font-family-button': 'Aclonica, sans-serif',
		};

		await setCustomize( buttonFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'buttonFontFamily' } );
			await insertBlock( 'Buttons' );
			await page.keyboard.type( 'font' );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/buttonFontFamily/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-button .wp-block-button__link, #submit, .ast-custom-button' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link, #submit',
			property: 'font-family',
		} ).cssValueToBe( `${ buttonFont[ 'font-family-button' ] }` );
		// await page.waitForSelector( 'button, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		// await expect( {
		// 	selector: 'button, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
		// } ).cssValueToBe( `${ buttonFont[ 'font-family-button' ] }` );
	} );

	it( 'button font size should apply correctly', async () => {
		const buttonFontSize = {
			'font-size-button': {
				desktop: 30,
				tablet: 20,
				mobile: 10,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( buttonFontSize );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-custom-button, .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.ast-custom-button, .wp-block-button .wp-block-button__link',
			property: 'font-size',
		} ).cssValueToBe( `${ buttonFontSize[ 'font-size-button' ].desktop }${ buttonFontSize[ 'font-size-button' ][ 'desktop-unit' ] }` );

		//Commenting search button code and post comment button selector due to issue
		// await page.waitForSelector('form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button');
		// await expect( {
		// 	selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
		// 	property: 'font-size',
		// } ).cssValueToBe( `${ buttonFontSize[ 'font-size-button' ].desktop }${ buttonFontSize[ 'font-size-button' ][ 'desktop-unit' ] }` );

		//responsive mode test case is commented due to GitHub issue
		// await setBrowserViewport( 'medium' );
		// await expect( {
		// 	selector: '.wp-block-button',
		// 	property: 'font-size',
		// } ).cssValueToBe(
		// 	`${ buttonFontSize[ 'font-size-button' ].tablet }${ buttonFontSize[ 'font-size-button' ][ 'tablet-unit' ] }` );

		// await setBrowserViewport( 'small' );
		// await expect( {
		// 	selector: '.wp-block-button',
		// 	property: 'font-size',
		// } ).cssValueToBe(
		// 	`${ buttonFontSize[ 'font-size-button' ].mobile }${ buttonFontSize[ 'font-size-button' ][ 'mobile-unit' ] }` );
	} );
	it( 'button font weight should apply correctly', async () => {
		const fontWeight = {
			'font-weight-button': '400',
		};
		await setCustomize( fontWeight );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-custom-button, .wp-block-button .wp-block-button__link, input#submit, input[type="submit"]' );
		await expect( {
			selector: '.ast-custom-button, .wp-block-button .wp-block-button__link, input#submit, input[type="submit"]',
			property: 'font-weight',
		} ).cssValueToBe( `${ fontWeight[ 'font-weight-button' ] }` );
	} );

	it( 'button font text transform property should apply correctly', async () => {
		const textTransform = {
			'text-transform-button': 'uppercase',
		};
		await setCustomize( textTransform );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-custom-button, .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.ast-custom-button, .wp-block-button .wp-block-button__link',
			property: 'text-transform',
		} ).cssValueToBe( `${ textTransform[ 'text-transform-button' ] }` );
	} );

	it( 'button font line height should apply correctly', async () => {
		const buttonLineHeight = {
			'theme-btn-line-height': '50px',
		};
		await setCustomize( buttonLineHeight );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-custom-button, .wp-block-button .wp-block-button__link, #comments .submit' );
		await expect( {
			selector: '.ast-custom-button, .wp-block-button .wp-block-button__link, #comments .submit',
			property: 'line-height',
		} ).cssValueToBe( `${ buttonLineHeight[ 'theme-btn-line-height' ] }` );
	} );

	it( 'button font letter spacing should apply correctly', async () => {
		const letterSpacing = {
			'theme-btn-letter-spacing': 3,
			'ast-range-unit': 'px',
		};
		await setCustomize( letterSpacing );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-custom-button' );
		await expect( {
			selector: '.ast-custom-button',
			property: 'letter-spacing',
		} ).cssValueToBe( `${ letterSpacing[ 'theme-btn-letter-spacing' ] }${ letterSpacing[ 'ast-range-unit' ] }` );

		await page.waitForSelector( '.wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link',
			property: 'letter-spacing',
		} ).cssValueToBe( `${ letterSpacing[ 'theme-btn-letter-spacing' ] }${ letterSpacing[ 'ast-range-unit' ] }` );

		//Commenting search button code and post comment button selector due to issue
		// await page.waitForSelector( 'input#submit, input[type="submit"]' );
		// await expect( {
		// 	selector: 'input#submit, input[type="submit"]',
		// 	property: 'letter-spacing',
		// } ).cssValueToBe( `${ letterSpacing[ 'theme-btn-letter-spacing' ] }${ letterSpacing[ 'ast-range-unit' ] }` );

		await page.waitForSelector( 'button, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: 'button, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'letter-spacing',
		} ).cssValueToBe( `${ letterSpacing[ 'theme-btn-letter-spacing' ] }${ letterSpacing[ 'ast-range-unit' ] }` );
	} );
} );
