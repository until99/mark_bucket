interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children?: React.ReactNode;
}

export const Form = ({ children, ...rest }: FormProps) => {
    return (
        <form {...rest}>
            {children}
        </form>
    );
}