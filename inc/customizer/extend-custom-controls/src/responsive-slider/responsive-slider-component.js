import PropTypes from 'prop-types';
import {RangeControl, Dashicon} from '@wordpress/components';
import {useEffect, useState} from 'react';
import parse from 'html-react-parser';
import svgIcons from '../../../../../assets/svg/svgs.json';

const ResponsiveSliderComponent = props => {

	let prop_value = props.control.setting.get();

	const [state, setState] = useState( prop_value );

	useEffect( () => {

		// If settings are changed externally.
		if( state !== prop_value ) {
			setState(prop_value);
		}
	}, [props]);

	const linkRemoteUpdate = () => {

		document.addEventListener( 'AstRemoteUpdateState', function( e ) {
			if ( e.detail === 'typography' ) {
				let value = props.control.setting.get();
				setState( value );
			}
		} );
	}

	linkRemoteUpdate();

	const updateValues = (device, newVal) => {
		let updateState = {...state};
		updateState[device] = newVal;
		props.control.setting.set(updateState);
		setState(updateState);
	};
	const renderOperationButtons = ( defaultVal ) => {
		return (
			<div className="ast-resp-slider-reset-wrap">
				<button
					className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small"
					disabled={ JSON.stringify(state) === JSON.stringify(defaultVal)} onClick={ e => {
					e.preventDefault();
					props.control.setting.set(defaultVal);
					setState(defaultVal);
				}}>
				<Dashicon icon='image-rotate'/>
				</button>
			</div>
		);
	};

	const renderInputHtml = (device, active = '') => {
		const {
			input_attrs,
		} = props.control.params;
		let defaultVal = props.control.params.default[device];

		const input_attrs_selected = input_attrs && ( input_attrs.min || input_attrs.max || input_attrs.step ) ? input_attrs : input_attrs ? input_attrs[state[`${device}-unit`]] : '';
		const defaults = { min: 0, max: 500, step: 1 };
		const controlProps = {
			...defaults,
			...( input_attrs_selected || {} ),
		};
		const { min, max, step } = controlProps;

		let savedValue = ( state[device] || 0 === state[device] ) ? parseFloat( state[device] ) : '';

		if ( 1 === step ) {
			savedValue = ( state[device] || 0 === state[device] ) ? parseInt( state[device] ) : '';
		}

		return <div className={`input-field-wrapper ${device} ${active}`}>
			<RangeControl
				resetFallbackValue={defaultVal}
				value={ savedValue }
				min={ min > 0 ? min : 0 }
				max={ max || 100 }
				step={ step || 1 }
				onChange={ ( newVal ) => { updateValues( device, newVal ) } }
			/>
		</div>;
	};

	const onUnitChange = (device, unitKey = '') => {

		const {
			input_attrs,
		} = props.control.params;

		let updateState = {
			...state
		};

		updateState[`${device}-unit`] = unitKey;

		if( input_attrs && input_attrs[updateState[`${device}-unit`]] && input_attrs[updateState[`${device}-unit`]].max && updateState[`${device}`] > input_attrs[updateState[`${device}-unit`]].max ) {
			updateState[`${device}`] = input_attrs[updateState[`${device}-unit`]].max;
		}

		props.control.setting.set(updateState);
		setState(updateState);
	};

	const unitChoices = ( device,  active = '') => {
		let respHtml = null;

		const {
			suffix,
		} = props.control.params;

		if ( suffix && Array.isArray( suffix ) ) {

			respHtml = 	Object.values( suffix ).map(unitKey => {
				let unitClass = '';


				if (state[`${device}-unit`] === unitKey) {
					unitClass = 'active';
				}

				let html = 	<li key={unitKey} className={`single-unit ${unitClass}`} onClick={() => onUnitChange(device, unitKey)} data-unit={unitKey}>
								<span className="unit-text">{unitKey}</span>
							</li>;
							return html;
			});

			return 	<ul key={device}
						className={`ast-responsive-units input-field-wrapper ast-spacing-${device}-responsive-units ${device} ${active}`}>
			{respHtml}
			</ul>;
		}

	};

	const {
		description,
		label,
		suffix,
	} = props.control.params;

	let labelHtml = null;
	let responsiveHtml = null;
	let suffixHtml = null;
	let descriptionHtml = null;
	let inputHtml = null;
	let unitHtml = null;
	let defaultVal = props.control.params.default;

	if (label) {
		const responsiveDesktop = parse( svgIcons['desktop-responsive'] );
		const responsiveTablet = parse( svgIcons['tablet-responsive'] );
		const responsiveMobile = parse( svgIcons['mobile-responsive'] );

		labelHtml = <span className="customize-control-title slider-control-label">{label}</span>;
		responsiveHtml = <ul key={'ast-resp-ul'} className="ast-responsive-slider-btns">
			<li className="desktop active">
				<button type="button" className="preview-desktop active" data-device="desktop">
					{responsiveDesktop}
				</button>
			</li>
			<li className="tablet">
				<button type="button" className="preview-tablet" data-device="tablet">
					{responsiveTablet}
				</button>
			</li>
			<li className="mobile">
				<button type="button" className="preview-mobile" data-device="mobile">
					{responsiveMobile}
				</button>
			</li>
		</ul>;
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	if ( suffix && ! Array.isArray( suffix ) ) {
		suffixHtml = <span className="ast-range-unit">{suffix}</span>;
	}

	inputHtml = <>
		{renderInputHtml('desktop', 'active')}
		{renderInputHtml('tablet')}
		{renderInputHtml('mobile')}
	</>;

	if ( suffix && Array.isArray( suffix ) ) {
		unitHtml = <>
			{unitChoices('desktop', 'active')}
			{unitChoices('tablet')}
			{unitChoices('mobile')}
		</>;
	}

	return <div className="ast-slider-wrap">
		<label key={'customizer-text'}>
			{labelHtml}
		</label>
		{responsiveHtml}
		{unitHtml}
		{suffixHtml}
		{ renderOperationButtons( defaultVal ) }
		{descriptionHtml}
		<div className="wrapper">
			{inputHtml}
		</div>
	</div>;
};

ResponsiveSliderComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default ResponsiveSliderComponent;
