/**
 * External dependencies
 */
import path from 'path';
import fs from 'fs';
import os from 'os';
import { v4 as uuid } from 'uuid';
//import { setBrowserViewport } from '@wordpress/e2e-test-utils';
/**
 * WordPress dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
	clickBlockToolbarButton,
	publishPost,
	setBrowserViewport,
} from '@wordpress/e2e-test-utils';

async function upload( selector ) {
	await page.waitForSelector( selector );
	const inputElement = await page.$( selector );
	const testImagePath = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'assets',
		'oreo.png',
	);
	const filename = uuid();
	const tmpFileName = path.join( os.tmpdir(), filename + '.png' );
	fs.copyFileSync( testImagePath, tmpFileName );
	await inputElement.uploadFile( tmpFileName );
	return filename;
}
async function waitForImage( filename ) {
	await page.waitForSelector(
		`.wp-block-image img[src$="${ filename }.png"]`,
	);
}
describe( 'Upload image, set alignment to wide width and check the width', () => {
	beforeEach( async () => {
		await createNewPost(
			{
				postType: 'post',
				title: 'image-block',
			},
		);
	} );
	it( 'image should be inserted with wide width alignment and expected and received wide width values should match', async () => {
		await insertBlock( 'Image' );
		const filename = await upload( '.wp-block-image input[type="file"]' );
		await waitForImage( filename );
		const regex = new RegExp(
			`<!-- wp:image {"id":\\d+,"sizeSlug":"full","linkDestination":"none"} -->\\s*<figure class="wp-block-image size-full"><img src="[^"]+\\/${ filename }\\.png" alt="" class="wp-image-\\d+"/></figure>\\s*<!-- \\/wp:image -->`,
		);
		await expect( getEditedPostContent() ).resolves.toMatch( regex );
		await setBrowserViewport( 'large' );

		// Set wide width for the image.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click(
			'[aria-label="Align"] button:nth-child(4)',
		);
		await page.waitForSelector( '#editor .edit-post-visual-editor' );

		await expect( {
			selector: '.wp-block-image',
			property: 'width',
		} ).cssValueToBe(
			`569.4px`,
		);

		// Set full width for the image.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click(
			'[aria-label="Align"] button:nth-child(5)',
		);
		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.wp-block-image',
			property: 'width',
		} ).cssValueToBe(
			`713.55px`,
		);

		await publishPost();
	} );
} );
