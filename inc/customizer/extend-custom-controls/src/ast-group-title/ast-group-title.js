import PropTypes from 'prop-types';
import {Dashicon} from '@wordpress/components';
import parse from 'html-react-parser';
import svgIcons from '../../../../../assets/svg/svgs.json';

const GroupTitleComponent = props => {

	const {
		label,
		responsive = false,
	} = props.control.params;

	let htmlLabel = null;

	const responsiveDesktop = parse( svgIcons['desktop-responsive'] );
	const responsiveTablet = parse( svgIcons['tablet-responsive'] );
	const responsiveMobile = parse( svgIcons['mobile-responsive'] );

	if ( label ) {
		htmlLabel = <span className="customize-control-title ast-group-section-title">{label}</span>;
	}

	const onResetClick = () => {
		const btnOptions = props.control.params.input_attrs.reset_linked_controls;
		btnOptions.forEach( function( btnOption ) {
			const defaultVal = wp.customize.control( 'astra-settings[' + btnOption + ']' ).params.default;
			wp.customize.control( 'astra-settings[' + btnOption + ']' ).setting.set( defaultVal );
		} );

		document.dispatchEvent(
			new CustomEvent("AstUpdatePaletteVariables", {})
		);
	};

	const renderResetBtn = () => {
		return <button className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small" onClick={ e => {
			e.preventDefault();
			onResetClick();
		}}>
		<Dashicon icon='image-rotate'/>
		</button>;
	};

	const responsiveHtml = (
		<ul key={ 'ast-resp-ul' } className="ast-responsive-btns">
			<li key={ 'desktop' } className="desktop active">
				<button type="button" className="preview-desktop" data-device="desktop">
					{responsiveDesktop}
				</button>
			</li>
			<li key={ 'tablet' } className="tablet">
				<button type="button" className="preview-tablet" data-device="tablet">
					{responsiveTablet}
				</button>
			</li>
			<li key={ 'mobile' } className="mobile">
				<button type="button" className="preview-mobile" data-device="mobile">
					{responsiveMobile}
				</button>
			</li>
		</ul>
	);

	return <>
		<label className="customizer-text">
			{ htmlLabel }
		</label>
		{ responsive &&
			responsiveHtml
		}
		<div className="ast-reset-btn-preset-wrap">
			{ renderResetBtn() }
		</div>
	</>;
};

GroupTitleComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( GroupTitleComponent );
