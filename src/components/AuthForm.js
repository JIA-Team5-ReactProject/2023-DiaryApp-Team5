import AuthField from "./AuthField";
import FieldData from "../constants/FieldData";
import AuthLinkButton from "./AuthLinkButton";

function AuthForm({ type, onSubmit }) {
  const formFields =
    type === "register"
      ? [
          ...FieldData,
          {
            name: "nickname",
            type: "text",
            placeholder: "닉네임",
            label: "닉네임",
          },
        ]
      : FieldData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        action=""
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        {formFields.map((field, index) => (
          <AuthField key={index} field={field} />
        ))}
        <AuthLinkButton type={type} />
      </form>
    </>
  );
}

export default AuthForm;
