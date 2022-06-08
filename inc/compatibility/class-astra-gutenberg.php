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
		if ( ! astra_block_based_legacy_setup() ) {
			add_action( 'wp', array( $this, 'is_layout_with_blocks' ), 1 );
		} else {
			add_filter( 'render_block', array( $this, 'restore_group_inner_container' ), 10, 2 );
		}
	}

	/**
	 * Check if blocks has been used on the layout. Adding it for making moder compatibility CSS target specific.
	 *
	 * @since 3.8.0
	 * @return void
	 */
	public function is_layout_with_blocks() {
		// @codingStandardsIgnoreStart
		$post_id = astra_get_post_id();
		/** @psalm-suppress RedundantConditionGivenDocblockType */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		if ( $post_id ) {
			/** @psalm-suppress RedundantConditionGivenDocblockType */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

			/** @psalm-suppress UndefinedConstant */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$current_post = get_post( (int) $post_id, OBJECT );
			/** @psalm-suppress UndefinedConstant */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

			/** @psalm-suppress TooManyArguments */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$enable_block_editor_attr = apply_filters( 'astra_disable_block_content_attr', true, $post_id );
			/** @psalm-suppress TooManyArguments */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

			/** @psalm-suppress PossiblyInvalidArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			if ( has_blocks( $current_post ) && $enable_block_editor_attr ) {
				/** @psalm-suppress PossiblyInvalidArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
				add_filter( 'astra_attr_article-entry-content-single-layout', array( $this, 'add_ast_block_container' ) );
				add_filter( 'astra_attr_article-entry-content', array( $this, 'add_ast_block_container' ) );
				add_filter( 'astra_attr_article-entry-content-page', array( $this, 'add_ast_block_container' ) );
			}
		}
		// @codingStandardsIgnoreEnd
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

		if ( 'core/group' === $block['blockName'] && ! empty( $block['attrs'] ) && isset( $block['attrs']['layout'] ) && isset( $block['attrs']['layout']['type'] ) && 'flex' === $block['attrs']['layout']['type'] ) {
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
