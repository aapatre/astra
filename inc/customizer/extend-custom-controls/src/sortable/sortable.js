import PropTypes from 'prop-types';

const SortableComponent = props => {

	let labelHtml = null,
		descriptionHtml = null;

	const {
		label,
		description,
		choices,
		inputAttrs,
		consider_hidden = false
	} = props.control.params;

	const value = props.control.setting.get() ? props.control.setting.get() : props.control.params.default;

	if (label) {
		labelHtml = <span className="customize-control-title">{label}</span>;
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	let visibleMetaHtml = Object.values(value).map(choiceID => {
		let html = '',
			title = ( 'object' == typeof choices[choiceID] && undefined != choices[choiceID] ) ? choices[choiceID].title : choices[choiceID],
			dataCloneIndex = ( 'object' == typeof choices[choiceID] && undefined != choices[choiceID] ) ? choices[choiceID]['clone_tracker'] : '',
			lastChar = parseInt( choiceID.slice(-1) ),
			indexValue = choiceID,
			isClonning = ( 'object' == typeof choices[choiceID] && true == choices[choiceID].clone && choices[choiceID].clone_limit > wp.customize.control( choices[choiceID].clone_tracker ).setting.get() ) ? true : false;

		if( lastChar ) {
			indexValue = choiceID.slice(0, -2);
		}

		if (choices[choiceID]) {
			html = <div {...inputAttrs} key={choiceID} className='ast-sortable-item' data-clone_tracker={ dataCloneIndex } data-value={choiceID} data-index={indexValue} data-title={title}>
					{ title }
					<i className="dashicons dashicons-visibility visibility"></i>
					{ ( isClonning && choiceID == choices[choiceID].main_index ) && <i className="dashicons sortable-clonner dashicons-admin-page"></i> }
					{ ( 'object' == typeof choices[choiceID] && choiceID != choices[choiceID].main_index ) && <i className="dashicons dashicons-remove remove-sortable-item"></i> }
					{ ( 'object' == typeof choices[choiceID] && choices[choiceID].is_parent ) &&
						<>
							<i className="dashicons dashicons-arrow-down-alt2 ast-option ast-accordion"></i>
							<div className="ast-sortable-subcontrols" data-index={choiceID}></div>
						</>
					}
			</div>;
		}
		return html;
	});

	let invisibleMetaHtml = Object.keys(choices).map(choiceID => {
		let html = '',
			title = ( 'object' == typeof choices[choiceID] && undefined != choices[choiceID] ) ? choices[choiceID].title : choices[choiceID],
			dataCloneIndex = ( 'object' == typeof choices[choiceID] && undefined != choices[choiceID] ) ? choices[choiceID]['clone_tracker'] : '',
			lastChar = parseInt( choiceID.slice(-1) ),
			isClonning = ( 'object' == typeof choices[choiceID] && true == choices[choiceID].clone && choiceID == choices[choiceID].main_index && choices[choiceID].clone_limit > wp.customize.control( choices[choiceID].clone_tracker ).setting.get() ) ? true : false,
			indexValue = choiceID;

		if( lastChar ) {
			indexValue = choiceID.slice(0, -2);
		}

		if ( ( 'object' != typeof choices[choiceID] && Array.isArray(value) && -1 === value.indexOf(choiceID) ) ||
			( ( 'object' == typeof choices[choiceID] && -1 === value.indexOf(choiceID) ) && ( isClonning || false == choices[choiceID].clone ) ) ) {
			html = <div {...inputAttrs} key={choiceID} className='ast-sortable-item invisible' data-clone_tracker={ dataCloneIndex } data-index={indexValue} data-value={choiceID} data-title={title}>
				{ title }
				<i className="dashicons dashicons-visibility visibility"></i>
				{ ( isClonning ) && <i className="dashicons sortable-clonner dashicons-admin-page"></i> }
				{ ( 'object' == typeof choices[choiceID] && true == choices[choiceID].clone && choiceID != choices[choiceID].main_index ) && <i className="dashicons dashicons-remove remove-sortable-item"></i> }
				{ ( 'object' == typeof choices[choiceID] && choices[choiceID].is_parent ) &&
					<>
						<i className="dashicons dashicons-arrow-down-alt2 ast-option ast-accordion"></i>
						<div className="ast-sortable-subcontrols" data-index={choiceID}></div>
					</>
				}
			</div>;
		}
		return html;
	});

	let withHiddenDataset = false,
		activeDatasetFromHidden = false;
	if( consider_hidden ) {
		withHiddenDataset = wp.customize.control( props.control.params.hidden_dataset ).setting.get() || false;
		if( withHiddenDataset ) {
			let identifiers = Object.keys(withHiddenDataset);
			activeDatasetFromHidden = identifiers.filter(function(id) {
				return withHiddenDataset[id]
			});
		}
	}

	const isKeyPresent = ( array, keyName ) => {
		if ( array.indexOf( keyName ) !== -1 ) {
			return true;
		} else {
			return false;
		}
	};

	let withhiddenDataHtml = Object.keys(withHiddenDataset).map(choiceID => {

		let html = '',
			title = ( 'object' == typeof choices[choiceID] && undefined != choices[choiceID] ) ? choices[choiceID].title : choices[choiceID],
			dataCloneIndex = ( 'object' == typeof choices[choiceID] && undefined != choices[choiceID] ) ? choices[choiceID]['clone_tracker'] : '',
			lastChar = parseInt( choiceID.slice(-1) ),
			indexValue = choiceID;

		if( lastChar ) {
			indexValue = choiceID.slice(0, -2);
		}

		if( activeDatasetFromHidden ) {
			if ( isKeyPresent(activeDatasetFromHidden, choiceID) ) {
				let isClonning = ( 'object' == typeof choices[choiceID] && true == choices[choiceID].clone && choices[choiceID].clone_limit > wp.customize.control( choices[choiceID].clone_tracker ).setting.get() ) ? true : false;
				html = <div {...inputAttrs} key={choiceID} className='ast-sortable-item' data-clone_tracker={ dataCloneIndex } data-value={choiceID} data-index={indexValue} data-title={title}>
					{ title }
					<i className="dashicons dashicons-visibility visibility"></i>
					{ ( isClonning && choiceID == choices[choiceID].main_index ) && <i className="dashicons sortable-clonner dashicons-admin-page"></i> }
					{ ( 'object' == typeof choices[choiceID] && choiceID != choices[choiceID].main_index ) && <i className="dashicons dashicons-remove remove-sortable-item"></i> }
					{ ( 'object' == typeof choices[choiceID] && choices[choiceID].is_parent ) &&
						<>
							<i className="dashicons dashicons-arrow-down-alt2 ast-option ast-accordion"></i>
							<div className="ast-sortable-subcontrols" data-index={choiceID}></div>
						</>
					}
				</div>;
			} else {
				let isClonning = ( 'object' == typeof choices[choiceID] && true == choices[choiceID].clone && choiceID == choices[choiceID].main_index && choices[choiceID].clone_limit > wp.customize.control( choices[choiceID].clone_tracker ).setting.get() ) ? true : false;
				html = <div {...inputAttrs} key={choiceID} className='ast-sortable-item invisible' data-clone_tracker={ dataCloneIndex } data-index={indexValue} data-value={choiceID} data-title={title}>
					{ title }
					<i className="dashicons dashicons-visibility visibility"></i>
					{ ( isClonning ) && <i className="dashicons sortable-clonner dashicons-admin-page"></i> }
					{ ( 'object' == typeof choices[choiceID] && true == choices[choiceID].clone && choiceID != choices[choiceID].main_index ) && <i className="dashicons dashicons-remove remove-sortable-item"></i> }
					{ ( 'object' == typeof choices[choiceID] && choices[choiceID].is_parent ) &&
						<>
							<i className="dashicons dashicons-arrow-down-alt2 ast-option ast-accordion"></i>
							<div className="ast-sortable-subcontrols" data-index={choiceID}></div>
						</>
					}
				</div>;
			}
		}
		return html;
	});

	return <>
			<label className='ast-sortable'>
				{labelHtml}
				{descriptionHtml}
			</label>
			<div className="sortable">
				{ ( consider_hidden && activeDatasetFromHidden ) &&
					<>
						{withhiddenDataHtml}
					</>
				}
				{ ( ! consider_hidden ) &&
					<>
						{visibleMetaHtml}
						{invisibleMetaHtml}
					</>
				}
			</div>
		</>;

};

SortableComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( SortableComponent );
