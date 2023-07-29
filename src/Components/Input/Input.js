import styles from "./Input.module.css";

export default function Input({
  type,
  placeholder,
  setState,
  value,
  name,
  required,
  autoFous,
  inputStyle,
}) {
  return (
    <input
      className={styles["input"]}
      type={type}
      placeholder={placeholder}
      onChange={setState}
      value={value}
      name={name}
      required={required}
      autoFocus={autoFous}
      style={inputStyle}
    />
  );
}
