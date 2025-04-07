export const InputErrors = ({ errors }) => {
  return (
    <div>
      {errors ? (
        <span className="text-red-500 font-bold text-base">{errors}</span>
      ) : (
        ""
      )}
    </div>
  );
};
