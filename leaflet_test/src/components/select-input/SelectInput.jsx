import "./styles.scss";

const SelectInput = ({
  options,
  value,
  onChange,
  label,
  keyName,
  keyLabelName,
}) => {
  const handleChange = (e) => {
    onChange &&
      onChange(
        options.find((item) => item[keyName] === parseInt(e.target.value))
      );
  };

  return (
    <div className="select-input">
      <select placeholder={label} value={value} onChange={handleChange}>
        {(options || []).map((item) => (
          <option key={item[keyName]} value={item[keyName]}>
            {item[keyLabelName]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
