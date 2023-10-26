function AuthField({ field }) {
  return (
    <>
      <label htmlFor={field.name} className="sr-only">
        {field.label}
      </label>
      <div className="relative">
        <input
          type={field.type}
          id={field.name}
          className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder={field.placeholder}
        />
      </div>
    </>
  );
}

export default AuthField;
