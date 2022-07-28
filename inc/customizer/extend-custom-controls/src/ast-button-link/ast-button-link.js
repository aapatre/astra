import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import { Fragment } from "@wordpress/element";

const ButtonLinkComponent = (props) => {
	const { title, url } = props.control.params;

	return (
		<Fragment>
			<a
				href={url}
				target="_blank"
				rel="noopener"
				className="button ast-button-link"
			>
				{title}
			</a>
		</Fragment>
	);
};
ButtonLinkComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo(ButtonLinkComponent);
