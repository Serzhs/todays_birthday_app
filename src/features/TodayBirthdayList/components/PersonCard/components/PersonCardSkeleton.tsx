import PersonCardStyle from '../PersonCard.module.scss';
import Typography from '../../../../../components/Typography/Typography';
import Skeleton from '../../../../../components/Skeleton/Skeleton';
import { getRandomNumber } from '../../../../../utils/getRandomNumber';
import style from '../PersonCard.module.scss';
import Image from '../../../../../components/Image/Image';

const PersonCardSkeleton = () => {
  return (
    <div className={PersonCardStyle.card}>
      <div>
        <div className={style.imageWrapper}>
          <Image src="" alt="" loadingMode={true} width={200} height={300} />
        </div>
      </div>
      <div></div>
      <div>
        <Typography variant="subtitle-2">Full Name:</Typography>
        <Typography variant="h3">
          {/*for skeleton length to be dynamic for each card*/}
          <Skeleton width={`${getRandomNumber(25, 100)}%`} height="2.09rem" />
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle-2">Occupation:</Typography>
        <Typography variant="h4">
          <Skeleton width={`${getRandomNumber(25, 100)}%`} height="1.875rem" />
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle-2">Birth year</Typography>
        <Typography variant="h6">
          <Skeleton width="2.25rem" height="1.599rem" />
        </Typography>
      </div>
    </div>
  );
};

export default PersonCardSkeleton;
