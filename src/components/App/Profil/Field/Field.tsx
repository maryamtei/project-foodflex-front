import { ChangeEvent, useId, useState } from 'react';

// import './styles.scss';

interface FieldProps {
  name: string;
  placeholder: string;
  label: string;
  [prop: string]: unknown;
}

function Field({ name, placeholder, label, ...props }: FieldProps) {
  const [value, setValue] = useState(placeholder);

  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <div className={value.length ? 'flex' : 'flex'}>
      <label htmlFor={inputId} className="flex">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        id={inputId}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default Field;
