import style from './Modal.module.scss';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';

type ModalProps = {
  title: string;
  description: string;
  rejectLabel?: string;
  acceptLabel?: string;
  onClose: () => void;
  onAccept?: () => void;
};

const Modal = ({
  title,
  description,
  rejectLabel,
  acceptLabel,
  onAccept,
  onClose,
}: ModalProps) => {
  return (
    <div className={style.modalBackdrop} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <Typography variant="h2">{title}</Typography>
          <button className={style.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div>
          <Typography variant="p">{description}</Typography>
        </div>
        <div className={style.modalFooter}>
          <Button label={rejectLabel || 'Close'} outline onClick={onClose} />
          {onAccept && (
            <Button label={acceptLabel || 'Accept'} onClick={onAccept} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
