import { createURL,	createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Transparent header in the customizer', () => {
	it( 'disable on archive page should apply corectly', async () => {
		const disableOnArchive = {
			'transparent-header-enable': 1,
			'transparent-header-disable-archive': 0,
		};
		await setCustomize( disableOnArchive );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'archive-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );
		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe( `absolute` );
	} );
	it( 'disable on 404 page should apply corectly', async () => {
		const disableOn404 = {
			'transparent-header-enable': 1,
			'transparent-header-disable-archive': 0,
		};
		await setCustomize( disableOn404 );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: '404-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );
		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe( `absolute` );
	} );
	it( 'disable on search page should apply corectly', async () => {
		const disableOnSearch = {
			'transparent-header-enable': 1,
			'transparent-header-disable-archive': 0,
		};
		await setCustomize( disableOnSearch );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#wp-block-search__input-1' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );
		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe( `absolute` );
	} );

	it( 'enable on blog page should apply correctly', async () => {
		const disableOnBlogPage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-index': 0,
		};
		await setCustomize( disableOnBlogPage );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test-2' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-1' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );
		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe( `absolute` );
	} );

	it( 'enable on latest posts page should apply correctly', async () => {
		const disableOnLatestPostPage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
		};
		await setCustomize( disableOnLatestPostPage );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test-2' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );
		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe( `absolute` );
	} );

	it( 'enable on pages should apply correctly', async () => {
		const disableOnPages = {
			'transparent-header-enable': 1,
			'transparent-header-disable-page': 0,
		};
		await setCustomize( disableOnPages );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-page' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );
		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe( `absolute` );
	} );

	it( 'enable on posts should apply correctly', async () => {
		const disableOnPosts = {
			'transparent-header-enable': 1,
			'transparent-header-disable-posts': 0,
		};
		await setCustomize( disableOnPosts );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test-posts' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-posts' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #masthead' );
		await expect( {
			selector: '.ast-theme-transparent-header #masthead',
			property: 'position',
		} ).cssValueToBe( `absolute` );
	} );
} );
