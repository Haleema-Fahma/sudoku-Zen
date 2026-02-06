import React, { useRef, useEffect } from 'react';

const Cell = ({ value, isPrefilled, isSelected, isInvalid, isSameNumber, onClick, onChange }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (isSelected && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSelected]);

    let classNames = `cell`;
    if (isPrefilled) classNames += ' prefilled';
    if (isSelected) classNames += ' selected';
    if (isInvalid) classNames += ' invalid';
    if (isSameNumber) classNames += ' same-number';

    return (
        <input
            ref={inputRef}
            className={classNames}
            value={value === 0 ? '' : value}
            readOnly={isPrefilled}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            onClick={onClick}
            onChange={(e) => {
                const val = e.target.value;
                // Grab the last character if multiple are pasted or typed fast, though maxLength=1 handles most
                // Filter for 1-9
                const lastChar = val.slice(-1);
                if (lastChar === '' || (lastChar >= '1' && lastChar <= '9')) {
                    onChange(lastChar === '' ? 0 : parseInt(lastChar));
                }
            }}
            onFocus={onClick}
            type="text" // Using type="text" with inputMode="numeric" is often better for styling than type="number"
        />
    );
};

export default Cell;
