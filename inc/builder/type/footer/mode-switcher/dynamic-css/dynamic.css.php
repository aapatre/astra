<?php
/**
 * Mode Switcher - Dynamic CSS
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Mode Switcher
 */
add_filter( 'astra_dynamic_theme_css', 'astra_footer_mode_switcher_dynamic_css' );

/**
 * Dynamic CSS
 *
 * @param  string $dynamic_css          Astra Dynamic CSS.
 * @param  string $dynamic_css_filtered Astra Dynamic CSS Filters.
 * @return String Generated dynamic CSS for Mode Switcher.
 *
 * @since x.x.x
 */
function astra_footer_mode_switcher_dynamic_css( $dynamic_css, $dynamic_css_filtered = '' ) {

	if ( ! Astra_Builder_Helper::is_component_loaded( 'mode-switcher', 'footer' ) ) {
		return $dynamic_css;
	}

	$_section      = 'footer-section-mode-switcher';
	$selector      = '.ast-footer-mode-switcher';
	$data_selector = '[data-section="footer-section-mode-switcher"]';

	$light_color = astra_get_option( 'footer-dark-mode-switcher-light-color' );
	$dark_color  = astra_get_option( 'footer-dark-mode-switcher-dark-color' );

	$icon_size     = astra_get_option( 'footer-mode-switcher-icon-size' );
	$border_radius = esc_attr( astra_get_option( 'footer-mode-switcher-border-radius' ) );
	$margin        = astra_get_option( $_section . '-margin' );
	$alignment     = astra_get_option( 'footer-mode-switcher-alignment' );

	/**
	 * Adjusting align CSS.
	 */
	$desktop_align_prop = 'float';
	$desktop_align_val = esc_attr( $alignment['desktop'] );
	if( 'center' === $alignment['desktop'] ) {
		$desktop_align_prop = 'margin';
		$desktop_align_val = '0 auto';
	}
	$tablet_align_prop = 'float';
	$tablet_align_val = esc_attr( $alignment['tablet'] );
	if( 'center' === $alignment['tablet'] ) {
		$tablet_align_prop = 'margin';
		$tablet_align_val = '0 auto';
	}
	$mobile_align_prop = 'float';
	$mobile_align_val = esc_attr( $alignment['mobile'] );
	if( 'center' === $alignment['mobile'] ) {
		$mobile_align_prop = 'margin';
		$mobile_align_val = '0 auto';
	}

	/**
	 * Mode Switcher - Desktop CSS.
	 */
	$css_output_desktop = array(
		$selector . ', ' . $selector . ':hover, ' . $selector . ':focus, ' . $selector . ':active' => array(
			'color'            => esc_attr( $light_color ),
			'background-color' => esc_attr( $dark_color ),
		),
		'.ast-dark-mode ' . $selector          => array(
			'color'            => esc_attr( $dark_color ),
			'background-color' => esc_attr( $light_color ),
		),
		$selector . ' .ast-mode-switcher-icon' => array(
			'height' => astra_get_css_value( $icon_size['desktop'], 'px' ),
			'width'  => astra_get_css_value( $icon_size['desktop'], 'px' ),
		),
		$selector                              => array(
			'border-radius' => astra_get_css_value( $border_radius, 'px' ),
		),
		$data_selector                         => array(
			'width' 		=> 'fit-content',
			$desktop_align_prop => $desktop_align_val,
			'margin-top'    => astra_responsive_spacing( $margin, 'top', 'desktop' ),
			'margin-bottom' => astra_responsive_spacing( $margin, 'bottom', 'desktop' ),
			'margin-left'   => astra_responsive_spacing( $margin, 'left', 'desktop' ),
			'margin-right'  => astra_responsive_spacing( $margin, 'right', 'desktop' ),
		),
	);

	/**
	 * Mode Switcher - Tablet CSS.
	 */
	$css_output_tablet = array(
		$selector . ' .ast-mode-switcher-icon' => array(
			'height' => astra_get_css_value( $icon_size['tablet'], 'px' ),
			'width'  => astra_get_css_value( $icon_size['tablet'], 'px' ),
		),
		$data_selector                         => array(
			$tablet_align_prop => $tablet_align_val,
			'margin-top'      => astra_responsive_spacing( $margin, 'top', 'tablet' ),
			'margin-bottom'   => astra_responsive_spacing( $margin, 'bottom', 'tablet' ),
			'margin-left'     => astra_responsive_spacing( $margin, 'left', 'tablet' ),
			'margin-right'    => astra_responsive_spacing( $margin, 'right', 'tablet' ),
		),
	);

	/**
	 * Mode Switcher - Mobile CSS.
	 */
	$css_output_mobile = array(
		$selector . ' .ast-mode-switcher-icon' => array(
			'height' => astra_get_css_value( $icon_size['mobile'], 'px' ),
			'width'  => astra_get_css_value( $icon_size['mobile'], 'px' ),
		),
		$data_selector                         => array(
			$mobile_align_prop => $mobile_align_val,
			'margin-top'      => astra_responsive_spacing( $margin, 'top', 'mobile' ),
			'margin-bottom'   => astra_responsive_spacing( $margin, 'bottom', 'mobile' ),
			'margin-left'     => astra_responsive_spacing( $margin, 'left', 'mobile' ),
			'margin-right'    => astra_responsive_spacing( $margin, 'right', 'mobile' ),
		),
	);

	/* Parse CSS from array() */
	$css_output  = astra_parse_css( $css_output_desktop );
	$css_output .= astra_parse_css( $css_output_tablet, '', strval( astra_get_tablet_breakpoint() ) );
	$css_output .= astra_parse_css( $css_output_mobile, '', strval( astra_get_mobile_breakpoint() ) );

	$dynamic_css .= $css_output;

	$dynamic_css .= Astra_Builder_Base_Dynamic_CSS::prepare_advanced_typography_css( $_section, $selector );

	return $dynamic_css;
}
