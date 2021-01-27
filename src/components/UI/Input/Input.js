import React from 'react';

import Classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [Classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(Classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                key={props.id}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig} 
            />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                key={props.id}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig} 
            />;
            break;
        case ('select'):
            inputElement = (
                <select 
                    key={props.id}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;            
        default:
            inputElement = <input 
                key={props.id}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig}
            />;
            break;
    }

    return (
        <div className={Classes.Input}>
            <label className={Classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
} 

export default Input;