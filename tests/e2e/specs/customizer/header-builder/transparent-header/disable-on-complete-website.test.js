import { createURL,	createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Transparent header in the customizer', () => {
	it( 'disable on archive, 404 and search page should apply correctly', async () => {
		const disableOnArchive = {
			'transparent-header-enable': 1,
			'transparent-header-disable-archive': 1,
		};
		await setCustomize( disableOnArchive );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'hello world' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disableArchive = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableArchive ).toBeNull( );

		await setCustomize( disableOnArchive );
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disable404 = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disable404 ).toBeNull( );
		await setCustomize( disableOnArchive );
		await createNewPost( { postType: 'post', title: 'test' } );
		ppStatus = await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#wp-block-search__input-1' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disableSearch = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableSearch ).toBeNull( );
	} );
	it( 'disable on blog page should apply corectly', async () => {
		const disableOnBlogPage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-index': 1,
		};
		await setCustomize( disableOnBlogPage );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disableBlog = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableBlog ).toBeNull( );
	} );
	it( 'disable on latest posts page should apply correctly', async () => {
		const disableOnLatestPostPage = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 1,
		};
		await setCustomize( disableOnLatestPostPage );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'sample' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disableLatestPost = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disableLatestPost ).toBeNull( );
	} );
	it( 'disable on pages should apply correctly', async () => {
		const disableOnPages = {
			'transparent-header-enable': 1,
			'transparent-header-disable-page': 1,
		};
		await setCustomize( disableOnPages );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disablePages = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablePages ).toBeNull( );
	} );
	it( 'disable on posts should apply correctly', async () => {
		const disableOnPosts = {
			'transparent-header-enable': 1,
			'transparent-header-disable-posts': 1,
		};
		await setCustomize( disableOnPosts );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disablePost = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.ast-theme-transparent-header #masthead' ) );
		await expect( disablePost ).toBeNull( );
	} );
} );
