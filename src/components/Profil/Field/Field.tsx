import { ChangeEvent, useId, useState } from 'react';

// import './styles.scss';

interface FieldProps {
  name: string;
  label: string;
  value: string;
  [prop: string]: unknown;
}

function Field({ name, label, value, ...props }: FieldProps) {
  const [valueControl, setValueControl] = useState(value);

  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValueControl(event.target.value);
  }

  return (
    <div>
      <label htmlFor={inputId} className="flex">
        {label}
      </label>
      <input
        className="ml-1 pl-1 text-fourthff border"
        name={name}
        value={valueControl}
        onChange={handleChange}
        id={inputId}
        placeholder={value}
        {...props}
      />
    </div>
  );
}

export default Field;
