interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  children?: React.ReactNode;
}

export const InputGroup = ({ label, children, ...props }: InputGroupProps) => {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {children}
    </div>
  );
};
