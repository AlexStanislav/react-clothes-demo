import "../assets/css/components/Checkbox.css";

interface CheckboxProps {
  value: string;
  onChange: (value: string) => void;
  currentValue: string;
}

function Checkbox({ value, onChange, currentValue }: CheckboxProps) {
  return (
    <label className="checkbox">
      <span className="checkbox__text">{value.toUpperCase()}</span>
      <input className="checkbox__input" type="radio" onChange={() => onChange(value)} checked={value === currentValue} />
      <span className="checkmark"></span>
    </label>
  );
}

export default Checkbox;
