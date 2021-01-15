import PropTypes from 'prop-types';
import {__} from '@wordpress/i18n';
import {RangeControl} from '@wordpress/components';
import {useState} from 'react';

const SliderComponent = props => {

	const [props_value, setPropsValue] = useState( props.control.setting.get() );

	const {
		label,
		description,
		suffix,
		input_attrs,
	} = props.control.params;

	let labelHtml = null,
		descriptionHtml = null,
		suffixHtml = null,
		defaultVal = parseInt( props.control.params.default ) === 0 ? 0 : Number( props.control.params.default ) || 0 ;

	const defaults = { min: 0, max: 500, step: 1 };
	const controlProps = {
		...defaults,
		...( input_attrs || {} ),
	};
	const { min, max, step } = controlProps;

	if (label) {
		labelHtml = <label><span className="customize-control-title">{label}</span></label>;
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	if (suffix) {
		suffixHtml = <span className="ast-range-unit">{suffix}</span>;
	}

	const updateValues = ( newVal ) => {
		setPropsValue( newVal );
		props.control.setting.set( newVal );
	};

	return <label>
		{labelHtml}
		{descriptionHtml}

		<div className="wrapper">
			<RangeControl
				value={ parseInt( props_value ) === 0 ? 0 : props_value || '' }
				onChange={ updateValues	}
				resetFallbackValue={ defaultVal }
				min={ min < 0 ? min : 0 }
				max={ max || 500 }
				step={ step || 1 }
				allowReset
			/>
		</div>
	</label>;
};

SliderComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( SliderComponent );
