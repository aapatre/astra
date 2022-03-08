<?php
/**
 * Gutenberg Compatibility File.
 *
 * @since 3.7.1
 * @package Astra
 */

/**
 * Astra Gutenberg Compatibility
 *
 * @since 3.7.1
 */
class Astra_Gutenberg {

	/**
	 * Constructor
	 */
	public function __construct() {
		if ( false === astra_get_option( 'enable-brand-new-editor-experience', true ) ) {
			add_filter( 'render_block', array( $this, 'restore_group_inner_container' ), 10, 2 );
		}

		add_action( 'wp', array( $this, 'is_layout_with_blocks' ), 1 );
	}

	/**
	 * Check if blocks has been used on the layout. Adding it for making moder compatibility CSS target specific.
	 *
	 * @since x.x.x
	 * @return void.
	 */
	public function is_layout_with_blocks() {
		$post_id = astra_get_post_id();
		if( $post_id ) {
			$current_post = get_post( $post_id, OBJECT );
			if ( has_blocks( $current_post ) ) {
				add_filter( 'astra_attr_article-entry-content-single-layout', array( $this, 'add_ast_block_container' ) );
				add_filter( 'astra_attr_article-entry-content', array( $this, 'add_ast_block_container' ) );
				add_filter( 'astra_attr_article-entry-content-page', array( $this, 'add_ast_block_container' ) );
			}
		}
	}

	/**
	 * Update Schema markup attribute.
	 *
	 * @param  array $attr An array of attributes.
	 *
	 * @return array       Updated embed markup.
	 */
	public function add_ast_block_container( $attr ) {
		$attr['ast-blocks-layout'] = 'true';
		return $attr;
	}

	/**
	 * Add Group block inner container when theme.json is added
	 * to avoid the group block width from changing to full width.
	 *
	 * @since 3.7.1
	 * @access public
	 *
	 * @param string $block_content Rendered block content.
	 * @param array  $block         Block object.
	 *
	 * @return string Filtered block content.
	 */
	public function restore_group_inner_container( $block_content, $block ) {
		$group_with_inner_container_regex = '/(^\s*<div\b[^>]*wp-block-group(\s|")[^>]*>)(\s*<div\b[^>]*wp-block-group__inner-container(\s|")[^>]*>)((.|\S|\s)*)/';

		if (
			( isset( $block['blockName'] ) && 'core/group' !== $block['blockName'] ) ||
			1 === preg_match( $group_with_inner_container_regex, $block_content )
		) {
			return $block_content;
		}

		$replace_regex   = '/(^\s*<div\b[^>]*wp-block-group[^>]*>)(.*)(<\/div>\s*$)/ms';
		$updated_content = preg_replace_callback(
			$replace_regex,
			array( $this, 'group_block_replace_regex' ),
			$block_content
		);
		return $updated_content;
	}

	/**
	 * Update the block content with inner div.
	 *
	 * @since 3.7.1
	 * @access public
	 *
	 * @param mixed $matches block content.
	 *
	 * @return string New block content.
	 */
	public function group_block_replace_regex( $matches ) {
		return $matches[1] . '<div class="wp-block-group__inner-container">' . $matches[2] . '</div>' . $matches[3];
	}

}

/**
 * Kicking this off by object
 */
new Astra_Gutenberg();
