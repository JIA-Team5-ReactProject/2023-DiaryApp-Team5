function AuthField({ field, value, onChange }) {
  const { name, type, placeholder, label } = field;

  return (
    <>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="font-extralight w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

export default AuthField;
