import "./checkbox.css";

const Checkbox = ({ text, isSelected, onCheckboxChange }) => {
  return (
    <div className="checkbox-container">
      <div className="checkbox-text">{text}</div>
      <input
        type="checkbox"
        className="toggle"
        checked={isSelected}
        onChange={onCheckboxChange}
      />
    </div>
  );
};

export default Checkbox;
