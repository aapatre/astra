<?php
/**
 * Astra Theme Customizer Configuration Builder.
 *
 * @package     astra-builder
 * @author      Astra
 * @copyright   Copyright (c) 2020, Astra
 * @link        https://wpastra.com/
 * @since       3.0.0
 */

// No direct access, please.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {
	return;
}

/**
 * Register Builder Customizer Configurations.
 *
 * @since 3.0.0
 */
class Astra_Customizer_Woo_Cart_Configs extends Astra_Customizer_Config_Base {


	/**
	 * Register Builder Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since 3.0.0
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {
		$_section = ( true === Astra_Builder_Helper::$is_header_footer_builder_active ) ? 'section-header-woo-cart' : 'section-woo-general';

		$_configs = array(

			/**
			 * Notice for Display Cart label.
			 */
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[woo-header-cart-label-display-notice]',
				'type'     => 'control',
				'control'  => 'ast-description',
				'section'  => $_section,
				'priority' => 50,
				'context'  => Astra_Builder_Helper::$general_tab,
				'help'     => '<p>' . __( 'Note: The Cart Label on the page will be displayed by using the shortcodes. For more information, please refer to the article ', 'astra' ) . '<a href="#">' . __( 'here', 'astra' ) . '</a>.</p>',
			),

			/**
			 * Option: Cart Label
			 */
			array(
				'name'              => ASTRA_THEME_SETTINGS . '[woo-header-cart-label-display]',
				'default'           => astra_get_option( 'woo-header-cart-label-display' ),
				'type'              => 'control',
				'section'           => $_section,
				'transport'         => 'postMessage',
				'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_html' ),
				'partial'           => array(
					'selector'            => '.ast-header-woo-cart',
					'container_inclusive' => false,
					'render_callback'     => array( Astra_Builder_Header::get_instance(), 'header_woo_cart' ),
				),
				'priority'          => 50,
				'title'             => __( 'Cart Label', 'astra' ),
				'control'           => 'ast-input-with-dropdown',
				'choices'           => array(
					'{cart_currency_name}'         => __( 'Currency Name', 'astra' ),
					'{cart_total}'                 => __( 'Total amount', 'astra' ),
					'{cart_currency_symbol}'       => __( 'Currency Symbol', 'astra' ),
					'{cart_total_currency_symbol}' => __( 'Total + Currency symbol', 'astra' ),
				),
				'context'           => Astra_Builder_Helper::$general_tab,
			),

			/**
			 * Option: Cart product count badge.
			 */
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[woo-header-cart-badge-display]',
				'default'   => astra_get_option( 'woo-header-cart-badge-display' ),
				'type'      => 'control',
				'section'   => $_section,
				'title'     => __( 'Display Cart Total', 'astra' ),
				'priority'  => 55,
				'transport' => 'postMessage',
				'control'   => 'ast-toggle-control',
				'context'   => Astra_Builder_Helper::$general_tab,
			),

			/**
			 * Option: Cart icon click action.
			 */
			array(
				'name'       => ASTRA_THEME_SETTINGS . '[woo-header-cart-click-action]',
				'default'    => astra_get_option( 'woo-header-cart-click-action' ),
				'type'       => 'control',
				'section'    => $_section,
				'title'      => __( 'Cart Click Action', 'astra' ),
				'control'    => 'ast-selector',
				'priority'   => 60,
				'choices'    => array(
					'default' => __( 'Dropdown Cart', 'astra' ),
					'flyout'  => __( 'Offcanvas Cart', 'astra' ),
				),
				'responsive' => false,
				'renderAs'   => 'text',
				'context'    => Astra_Builder_Helper::$desktop_general_tab,
				'divider'    => array( 'ast_class' => 'ast-top-divider' ),
			),

			/**
			 * Option: Woo sidebar Off-Canvas Slide-Out.
			 */
			array(
				'name'       => ASTRA_THEME_SETTINGS . '[woo-desktop-cart-flyout-direction]',
				'default'    => astra_get_option( 'woo-desktop-cart-flyout-direction' ),
				'type'       => 'control',
				'control'    => 'ast-selector',
				'section'    => $_section,
				'priority'   => 65,
				'title'      => __( 'Position', 'astra' ),
				'choices'    => array(
					'left'  => __( 'Left', 'astra' ),
					'right' => __( 'Right', 'astra' ),
				),
				'context'    => array(
					Astra_Builder_Helper::$general_tab_config,
					array(
						'setting'  => ASTRA_THEME_SETTINGS . '[woo-header-cart-click-action]',
						'operator' => '==',
						'value'    => 'flyout',
					),
				),
				'renderAs'   => 'text',
				'responsive' => false,
			),

			/**
			 * Option: Flyout width
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[woo-desktop-cart-flyout-width]',
				'default'     => astra_get_option( 'woo-desktop-cart-flyout-width' ),
				'type'        => 'control',
				'transport'   => 'postMessage',
				'section'     => $_section,
				'context'     => array(
					Astra_Builder_Helper::$general_tab_config,
					array(
						'setting'  => ASTRA_THEME_SETTINGS . '[woo-header-cart-click-action]',
						'operator' => '==',
						'value'    => 'flyout',
					),
				),
				'title'       => __( 'Flyout Width', 'astra' ),
				'control'     => 'ast-slider',
				'suffix'      => 'px',
				'priority'    => 70,
				'input_attrs' => array(
					'min'  => 0,
					'step' => 1,
					'max'  => 1920,
				),
			),

			/**
			 * Option: Icon Style
			 */
			array(
				'name'       => ASTRA_THEME_SETTINGS . '[woo-header-cart-icon-style]',
				'default'    => astra_get_option( 'woo-header-cart-icon-style' ),
				'type'       => 'control',
				'transport'  => 'postMessage',
				'section'    => $_section,
				'title'      => __( 'Style', 'astra' ),
				'control'    => 'ast-selector',
				'priority'   => 45,
				'choices'    => array(
					'outline' => __( 'Outline', 'astra' ),
					'fill'    => __( 'Fill', 'astra' ),
				),
				'responsive' => false,
				'renderAs'   => 'text',
				'context'    => Astra_Builder_Helper::$design_tab,
			),

			/**
			 * Option: Icon color
			 */
			array(
				'name'       => ASTRA_THEME_SETTINGS . '[header-woo-cart-icon-colors]',
				'default'    => astra_get_option( 'header-woo-cart-icon-colors' ),
				'type'       => 'control',
				'control'    => 'ast-color-group',
				'title'      => __( 'Color', 'astra' ),
				'section'    => $_section,
				'transport'  => 'postMessage',
				'priority'   => 45,
				'context'    => array(
					Astra_Builder_Helper::$design_tab_config,
					array(
						'setting'  => ASTRA_THEME_SETTINGS . '[woo-header-cart-icon-style]',
						'operator' => '!=',
						'value'    => 'none',
					),
				),
				'responsive' => false,
			),

			/**
			 * Option: Icon Normal Color section
			 */
			array(
				'type'       => 'sub-control',
				'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-cart-icon-colors]',
				'section'    => $_section,
				'control'    => 'ast-responsive-color',
				'transport'  => 'postMessage',
				'name'       => 'header-woo-cart-icon-color',
				'default'    => astra_get_option( 'header-woo-cart-icon-color' ),
				'title'      => __( 'Normal', 'astra' ),
				'responsive' => false,
				'rgba'       => true,
				'priority'   => 65,
				'context'    => Astra_Builder_Helper::$design_tab,
			),

			/**
			 * Option: Icon Hover Color section
			 */
			array(
				'type'       => 'sub-control',
				'control'    => 'ast-responsive-color',
				'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-cart-icon-colors]',
				'section'    => $_section,
				'transport'  => 'postMessage',
				'name'       => 'header-woo-cart-icon-hover-color',
				'default'    => astra_get_option( 'header-woo-cart-icon-hover-color' ),
				'title'      => __( 'Hover', 'astra' ),
				'responsive' => false,
				'rgba'       => true,
				'priority'   => 65,
				'context'    => Astra_Builder_Helper::$design_tab,
			),

			/**
			 * Option: Border Radius
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[woo-header-cart-icon-radius]',
				'default'     => astra_get_option( 'woo-header-cart-icon-radius' ),
				'type'        => 'control',
				'transport'   => 'postMessage',
				'section'     => $_section,
				'context'     => array(
					Astra_Builder_Helper::$design_tab_config,
					array(
						'setting'  => ASTRA_THEME_SETTINGS . '[woo-header-cart-icon-style]',
						'operator' => '!=',
						'value'    => 'none',
					),
				),
				'title'       => __( 'Border Radius', 'astra' ),
				'control'     => 'ast-slider',
				'suffix'      => 'px',
				'priority'    => 47,
				'input_attrs' => array(
					'min'  => 0,
					'step' => 1,
					'max'  => 200,
				),
			),

			/**
			 * Option: Icon total label position.
			 */
			array(
				'name'       => ASTRA_THEME_SETTINGS . '[woo-header-cart-icon-total-label-position]',
				'default'    => astra_get_option( 'woo-header-cart-icon-total-label-position' ),
				'type'       => 'control',
				'transport'  => 'postMessage',
				'section'    => $_section,
				'title'      => __( 'Cart Total Position', 'astra' ),
				'control'    => 'ast-selector',
				'priority'   => 47,
				'choices'    => array(
					'left'   => __( 'Left', 'astra' ),
					'right'  => __( 'Right', 'astra' ),
					'bottom' => __( 'Bottom', 'astra' ),

				),
				'responsive' => true,
				'renderAs'   => 'text',
				'context'    => Astra_Builder_Helper::$design_tab,
			),

			/**
			 * Option: Icon color
			 */
			array(
				'name'              => ASTRA_THEME_SETTINGS . '[transparent-header-woo-cart-icon-color]',
				'default'           => astra_get_option( 'transparent-header-woo-cart-icon-color' ),
				'type'              => 'control',
				'control'           => 'ast-color',
				'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_alpha_color' ),
				'transport'         => 'postMessage',
				'title'             => __( 'Woo Cart Icon Color', 'astra' ),
				'context'           => array(
					Astra_Builder_Helper::$design_tab_config,
					array(
						'setting'  => ASTRA_THEME_SETTINGS . '[woo-header-cart-icon-style]',
						'operator' => '!=',
						'value'    => 'none',
					),
				),
				'section'           => 'section-transparent-header',
				'priority'          => 85,
			),
		);

		/**
		 * Adding the Margin and Padding option.
		 * $_section: section-header-woo-cart.
		 */
		$_configs = array_merge( $_configs, Astra_Builder_Base_Configuration::prepare_advanced_tab( $_section ) );

		$configurations                    = array_merge( $configurations, $_configs );
		$header_woo_cart_background_colors = 'header-woo-cart-background-colors';

		$_configs = array(
			/**
			 * Option: Divider
			 */
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[header-cart-icon-divider]',
				'section'  => $_section,
				'title'    => __( 'Header Cart Icon', 'astra' ),
				'type'     => 'control',
				'control'  => 'ast-heading',
				'priority' => 30,
				'settings' => array(),
				'context'  => Astra_Builder_Helper::$general_tab,
			),
		);

		if ( true === Astra_Builder_Helper::$is_header_footer_builder_active ) {
			$_configs = array(
				/**
				* Woo Cart section
				*/
				array(
					'name'     => $_section,
					'type'     => 'section',
					'priority' => 5,
					'title'    => __( 'WooCommerce Cart', 'astra' ),
					'panel'    => 'panel-header-builder-group',
				),

				/**
				* Option: Cart Icon Size
				*/
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[header-woo-cart-icon-size]',
					'section'           => $_section,
					'transport'         => 'postMessage',
					'default'           => astra_get_option( 'header-woo-cart-icon-size' ),
					'title'             => __( 'Icon Size', 'astra' ),
					'type'              => 'control',
					'suffix'            => 'px',
					'control'           => 'ast-responsive-slider',
					'divider'           => array( 'ast_class' => 'ast-bottom-divider' ),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'priority'          => 48,
					'input_attrs'       => array(
						'min'  => 0,
						'step' => 1,
						'max'  => 100,
					),
					'context'           => array(
						Astra_Builder_Helper::$design_tab_config,
					),
				),

				/**
				 * Woo Cart Tabs
				 */
				array(
					'name'        => $_section . '-ast-context-tabs',
					'section'     => $_section,
					'type'        => 'control',
					'control'     => 'ast-builder-header-control',
					'priority'    => 0,
					'description' => '',
				),

				/**
				 * Option: Divider
				 * Option: WOO cart tray Section divider
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[section-woo-cart-tray-divider]',
					'type'     => 'control',
					'control'  => 'ast-heading',
					'section'  => $_section,
					'title'    => __( 'Cart Tray', 'astra' ),
					'priority' => 60,
					'settings' => array(),
					'context'  => Astra_Builder_Helper::$design_tab,
				),


				// Option: Cart Link / Text Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-cart-colors]',
					'section'    => $_section,
					'transport'  => 'postMessage',
					'name'       => 'header-woo-cart-text-color',
					'default'    => astra_get_option( 'header-woo-cart-text-color' ),
					'title'      => __( 'Text Color', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 65,
					'context'    => Astra_Builder_Helper::$design_tab,
				),
				// Option: Cart Background Color.
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[' . $header_woo_cart_background_colors . ']',
					'default'    => astra_get_option( 'header-woo-cart-background-colors' ),
					'type'       => 'control',
					'control'    => 'ast-color-group',
					'title'      => __( 'Background Color', 'astra' ),
					'section'    => $_section,
					'transport'  => 'postMessage',
					'priority'   => 65,
					'context'    => Astra_Builder_Helper::$design_tab,
					'responsive' => true,
				),
				// Option: Cart Background Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'parent'     => ASTRA_THEME_SETTINGS . '[' . $header_woo_cart_background_colors . ']',
					'section'    => $_section,
					'transport'  => 'postMessage',
					'name'       => 'header-woo-cart-background-color',
					'default'    => astra_get_option( 'header-woo-cart-background-color' ),
					'title'      => __( 'Normal', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 65,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				// Option: Cart Background Hover Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'parent'     => ASTRA_THEME_SETTINGS . '[' . $header_woo_cart_background_colors . ']',
					'section'    => $_section,
					'transport'  => 'postMessage',
					'name'       => 'header-woo-cart-background-hover-color',
					'default'    => astra_get_option( 'header-woo-cart-background-hover-color' ),
					'title'      => __( 'Hover', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 65,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				// Option: Cart Separator Color.
				array(
					'type'       => 'control',
					'section'    => $_section,
					'control'    => 'ast-responsive-color',
					'transport'  => 'postMessage',
					'name'       => ASTRA_THEME_SETTINGS . '[header-woo-cart-separator-color]',
					'default'    => astra_get_option( 'header-woo-cart-separator-color' ),
					'title'      => __( 'Separator Color', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 65,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				array(
					'name'       => ASTRA_THEME_SETTINGS . '[header-woo-cart-link-colors]',
					'default'    => astra_get_option( 'header-woo-cart-link-colors' ),
					'type'       => 'control',
					'control'    => 'ast-color-group',
					'title'      => __( 'Link Color', 'astra' ),
					'section'    => $_section,
					'transport'  => 'postMessage',
					'priority'   => 65,
					'context'    => Astra_Builder_Helper::$design_tab,
					'responsive' => true,
				),

				// Option: Cart Link / Text Color.
				array(
					'type'       => 'sub-control',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-cart-link-colors]',
					'section'    => $_section,
					'control'    => 'ast-responsive-color',
					'transport'  => 'postMessage',
					'name'       => 'header-woo-cart-link-color',
					'default'    => astra_get_option( 'header-woo-cart-link-color' ),
					'title'      => __( 'Normal', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 65,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				// Option: Cart Link Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-cart-link-colors]',
					'section'    => $_section,
					'transport'  => 'postMessage',
					'name'       => 'header-woo-cart-link-hover-color',
					'default'    => astra_get_option( 'header-woo-cart-link-hover-color' ),
					'title'      => __( 'Hover', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 65,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				array(
					'name'       => ASTRA_THEME_SETTINGS . '[header-woo-cart-button-text-colors]',
					'default'    => astra_get_option( 'header-woo-cart-button-text-colors' ),
					'type'       => 'control',
					'control'    => 'ast-color-group',
					'title'      => __( 'Text', 'astra' ),
					'section'    => $_section,
					'transport'  => 'postMessage',
					'priority'   => 70,
					'context'    => Astra_Builder_Helper::$design_tab,
					'responsive' => true,
					'divider'    => array(
						'ast_class' => 'ast-top-divider',
						'ast_title' => __( 'Cart Button', 'astra' ),
					),
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[header-woo-cart-button-background-colors]',
					'default'    => astra_get_option( 'header-woo-cart-button-background-colors' ),
					'type'       => 'control',
					'control'    => 'ast-color-group',
					'title'      => __( 'Background', 'astra' ),
					'section'    => $_section,
					'transport'  => 'postMessage',
					'priority'   => 70,
					'context'    => Astra_Builder_Helper::$design_tab,
					'responsive' => true,
				),

				// Option: Cart Button Text Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-cart-button-text-colors]',
					'section'    => $_section,
					'transport'  => 'postMessage',
					'name'       => 'header-woo-cart-btn-text-color',
					'default'    => astra_get_option( 'header-woo-cart-btn-text-color' ),
					'title'      => __( 'Normal', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 70,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				// Option: Cart Button Background Color.
				array(
					'type'       => 'sub-control',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-cart-button-background-colors]',
					'section'    => $_section,
					'control'    => 'ast-responsive-color',
					'transport'  => 'postMessage',
					'name'       => 'header-woo-cart-btn-background-color',
					'default'    => astra_get_option( 'header-woo-cart-btn-background-color' ),
					'title'      => __( 'Normal', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 70,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				// Option: Cart Button Hover Text Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-cart-button-text-colors]',
					'section'    => $_section,
					'transport'  => 'postMessage',
					'name'       => 'header-woo-cart-btn-text-hover-color',
					'default'    => astra_get_option( 'header-woo-cart-btn-text-hover-color' ),
					'title'      => __( 'Hover', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 70,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				// Option: Cart Button Hover Background Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'transport'  => 'postMessage',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-cart-button-background-colors]',
					'section'    => $_section,
					'name'       => 'header-woo-cart-btn-bg-hover-color',
					'default'    => astra_get_option( 'header-woo-cart-btn-bg-hover-color' ),
					'title'      => __( 'Hover', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 70,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				array(
					'name'       => ASTRA_THEME_SETTINGS . '[header-woo-checkout-button-text-colors]',
					'default'    => astra_get_option( 'header-woo-checkout-button-text-colors' ),
					'type'       => 'control',
					'control'    => 'ast-color-group',
					'title'      => __( 'Text', 'astra' ),
					'section'    => $_section,
					'transport'  => 'postMessage',
					'priority'   => 75,
					'context'    => Astra_Builder_Helper::$design_tab,
					'responsive' => true,
					'divider'    => array(
						'ast_class' => 'ast-top-divider',
						'ast_title' => __( 'Checkout Button', 'astra' ),
					),
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[header-woo-checkout-button-background-colors]',
					'default'    => astra_get_option( 'header-woo-checkout-button-background-colors' ),
					'type'       => 'control',
					'control'    => 'ast-color-group',
					'title'      => __( 'Background', 'astra' ),
					'section'    => $_section,
					'transport'  => 'postMessage',
					'priority'   => 75,
					'context'    => Astra_Builder_Helper::$design_tab,
					'responsive' => true,
				),

				// Option: Checkout Button Text Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-checkout-button-text-colors]',
					'section'    => $_section,
					'transport'  => 'postMessage',
					'name'       => 'header-woo-checkout-btn-text-color',
					'default'    => astra_get_option( 'header-woo-checkout-btn-text-color' ),
					'title'      => __( 'Normal', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 75,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				// Option: Checkout Button Background Color.
				array(
					'type'       => 'sub-control',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-checkout-button-background-colors]',
					'section'    => $_section,
					'control'    => 'ast-responsive-color',
					'transport'  => 'postMessage',
					'name'       => 'header-woo-checkout-btn-background-color',
					'default'    => astra_get_option( 'header-woo-checkout-btn-background-color' ),
					'title'      => __( 'Normal', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 75,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				// Option: Checkout Button Hover Text Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-checkout-button-text-colors]',
					'section'    => $_section,
					'transport'  => 'postMessage',
					'name'       => 'header-woo-checkout-btn-text-hover-color',
					'default'    => astra_get_option( 'header-woo-checkout-btn-text-hover-color' ),
					'title'      => __( 'Hover', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 75,
					'context'    => Astra_Builder_Helper::$design_tab,
				),

				// Option: Checkout Button Hover Background Color.
				array(
					'type'       => 'sub-control',
					'control'    => 'ast-responsive-color',
					'transport'  => 'postMessage',
					'parent'     => ASTRA_THEME_SETTINGS . '[header-woo-checkout-button-background-colors]',
					'section'    => $_section,
					'name'       => 'header-woo-checkout-btn-bg-hover-color',
					'default'    => astra_get_option( 'header-woo-checkout-btn-bg-hover-color' ),
					'title'      => __( 'Hover', 'astra' ),
					'responsive' => true,
					'rgba'       => true,
					'priority'   => 75,
					'context'    => Astra_Builder_Helper::$design_tab,
				),
			);

			$_configs = array_merge( $_configs, Astra_Builder_Base_Configuration::prepare_visibility_tab( $_section ) );

		}

		$configurations = array_merge( $configurations, $_configs );

		return $configurations;
	}
}

/**
 * Kicking this off by creating object of this class.
 */

new Astra_Customizer_Woo_Cart_Configs();
