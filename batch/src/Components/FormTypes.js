import React from 'react';

function FormShortText(props) {
  return (
    <div className="form_container">
      <label htmlFor={props.title}>
        {props.title}
      </label>
      <input type="text" name={props.title} id={props.title} value={props.value} onChange={props.handleChange} />
    </div>
  );
}

function FormLongText(props) {
  return (
    <div className="form_container">
      <label htmlFor={props.title}>
        {props.title}
      </label>
      <textarea name={props.title} id={props.title} value={props.value} onChange={props.handleChange} />
    </div>
  );
}

function FormCheckBox(props) {
  return (
    <div className="form_container">
      <label htmlFor={props.title}>
        {props.title}
      </label>
      <input type="checkbox" name={props.title} id={props.title} value={props.value} onChange={props.handleChange} />
    </div>
  );
}

function FormDropDown(props) {
  const optionArray = props.optionArray.map((a,idx) => {
    return <option value={a}>{a}</option>
  });
  return (
    <div className="form_container">
      <label htmlFor={props.title}>
        {props.title}
      </label>
      <select 
        value={props.value} 
        onChange={props.handleChange} 
      >
      {optionArray}
      </select>
    </div>
  );
}

export { FormShortText, FormLongText, FormCheckBox, FormDropDown }