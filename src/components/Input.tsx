interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = (props: InputProps) => {
    return <input type="text" {...props} />;
}