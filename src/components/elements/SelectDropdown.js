import React from 'react';
import Select from 'react-select';

const SelectDropdown = React.forwardRef(function SelectDropdownt(
  { defaultValue, onChange, styles, options, ...rest },
  ref,
) {
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      fontSize: '14px',
      textTransform: 'capitalize',
      zIndex: 9999999,
    }),

    placeholder: (provided) => ({
      ...provided,
      color: '#006666',
    }),

    control: (provided, state) => ({
      ...provided,
      fontSize: '14px',
      height: '50px',
      background: 'white',
      border: `1px solid ${
        state.isFocused ? '#006666' : 'rgba(0, 102, 102, 0.5)'
      }`,
      outline: 0,
      boxShadow: 0,
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      color: '#111',
      textTransform: 'capitalize',
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#006666'
        : state.isFocused
        ? 'rgba(0, 102, 102, 0.1)'
        : '',
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      styles={customStyles}
      options={options}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
});

export default SelectDropdown;
