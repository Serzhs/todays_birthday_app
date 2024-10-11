import style from './Button.module.scss';

type ButtonProps = {
  label: string;
  type?: HTMLButtonElement['type'];
  outline?: boolean;
  size?: 'medium' | 'large';
  onClick: () => void;
};

const Button = ({
  label,
  type = 'button',
  size = 'medium',
  outline = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${style.button} ${outline ? style.outline : ''} ${style[size]}`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
