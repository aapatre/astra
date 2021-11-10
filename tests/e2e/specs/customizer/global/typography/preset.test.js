import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';

describe( 'Global typography settings in the customizer', () => {
	it( 'preset settings should be applied correctly', async () => {
		const presetFont = {
			'body-font-family': "'Source Sans Pro', sans-serif",
			'font-size-body': {
				desktop: '17',
				tablet: '17',
				mobile: '17',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'body-font-weight': '400',
			'body-text-transform': 'uppercase',
			'body-line-height': '5px',
			//'para-margin-bottom': '3px',
			'headings-font-family': 'Montserrat, sans-serif', 
			'headings-font-weight': '700',
			'headings-text-transform': 'lowercase',
			//'headings-line-height': '4',
		};

		await setCustomize( presetFont );
		await createNewPost( { postType: 'post', title: 'Preset Test' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( '/preset-test/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );

		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe( `${ presetFont[ 'body-font-family' ] }`,
		);

		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ presetFont[ 'font-size-body' ].desktop }${ presetFont[ 'font-size-body' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ presetFont[ 'font-size-body' ].tablet }${ presetFont[ 'font-size-body' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ presetFont[ 'font-size-body' ].mobile }${ presetFont[ 'font-size-body' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: 'body',
			property: 'font-weight',
		} ).cssValueToBe( `${ presetFont[ 'body-font-weight' ] }` );

		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ presetFont[ 'body-text-transform' ] }` );

		await expect( {
			selector: 'body',
			property: 'line-height',
		} ).cssValueToBe( `${ presetFont[ 'body-line-height' ] }` );

		// await expect( {
		// 	selector: 'p, .entry-content p',
		// 	property: 'margin-bottom',
		// } ).cssValueToBe( `${ presetFont[ 'para-margin-bottom' ] }` );

		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ presetFont[ 'headings-font-family' ] }`,
		);

		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ presetFont[ 'body-font-weight' ] }`,
		);

		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ presetFont[ 'headings-text-transform' ] }` );

		// await expect( {
		// 	selector: 'h1, .entry-content h1',
		// 	property: 'line-height',
		// } ).cssValueToBe( `${ presetFont[ 'headings-line-height' ] }` );
	} );
} );
