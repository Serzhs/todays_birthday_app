import Typography from '../../../../components/Typography/Typography';
import style from './PersonCard.module.scss';
import Image from '../../../../components/Image/Image';

type PersonCardProps = {
  fullName: string;
  year: number;
  occupation: string;
  image: string;
};

const PersonCard = ({ year, fullName, occupation, image }: PersonCardProps) => {
  return (
    <div className={style.card}>
      <div>
        <div className={style.imageWrapper}>
          <Image
            src={image}
            alt={fullName}
            loadingMode={false}
            width={200}
            height={300}
          />
        </div>
      </div>
      <div></div>
      <div>
        <Typography variant="subtitle-2">Full Name:</Typography>
        <Typography variant="h3">{fullName}</Typography>
      </div>
      <div>
        <Typography variant="subtitle-2">Occupation:</Typography>
        <Typography variant="h4">{occupation}</Typography>
      </div>
      <div>
        <Typography variant="subtitle-2">Birth year</Typography>
        <Typography variant="h6">{year}</Typography>
      </div>
    </div>
  );
};

export default PersonCard;
