import PropTypes from 'prop-types';
import {useState} from 'react';
import {Dashicon} from '@wordpress/components';

const MenuSelectComponent = props => {

	const [props_value, setPropsValue] = useState(props.control.setting.get());

	const onSelectChange = (value) => {
		setPropsValue(value);
		props.control.setting.set(value);
	};

	const {
		label,
		name,
		description
	} = props.control.params;

	let htmlLabel 		= null;
	let descriptionHtml = null;

	if ( label ) {
		htmlLabel = <span className="customize-control-title">{label}</span>;
	}

	let optionsHtml = Object.entries(AstraBuilderCustomizerData.menuLocations).map(key => {
		let html = <option key={key[0]} value={key[0]}>{key[1]}</option>;
		return html;
	});

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	const renderSettingOperation = () => {
		return (
			<div className="ast-menu-setting-wrap">
				<span
					data-name={name}
					className="ast-menu-location-btn"
					onClick={ e => {
						var section = wp.customize.section( 'menu_locations' );
						section.expand();
				}}>
					<Dashicon icon='admin-generic'/>
				</span>
			</div>
		);
	};

	return <>
		{htmlLabel}
		{descriptionHtml}
		{ renderSettingOperation() }

		<div className="customize-control-content">
			<select className="ast-select-input" data-name={name} data-value={props_value} value={props_value}
					onChange={() => {
						onSelectChange(event.target.value);
					}}>
				{optionsHtml}
			</select>
		</div>
	</>;

};

MenuSelectComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( MenuSelectComponent );
