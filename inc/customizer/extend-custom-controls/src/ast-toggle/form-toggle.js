/**
 * External dependencies
 */
import classnames from 'classnames';
import { noop } from 'lodash';

function FormToggle({
    className,
    checked,
    id,
    disabled,
    onChange = noop,
    ...props
}) {
    const wrapperClasses = classnames('components-form-toggle ast-form-toggle', className, {
        'is-checked': checked,
        'is-disabled': disabled,
    });

    return (
        <span className={wrapperClasses}>
            <input
                className="components-form-toggle__input ast-switch"
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                {...props}
            />
            <label htmlFor="unchecked" className="ast-label"></label>
        </span>
    );
}

export default FormToggle;