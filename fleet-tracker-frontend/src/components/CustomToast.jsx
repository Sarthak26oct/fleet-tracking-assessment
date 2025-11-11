const CustomToast = ({ title, message }) => {
  return (
    <div style={{ padding: "4px 0" }}>
      <strong>{title}</strong>
      <div>{message}</div>
    </div>
  );
};

export default CustomToast;
