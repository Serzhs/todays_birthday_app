import style from './Image.module.scss';
import Skeleton from '../../components/Skeleton/Skeleton';

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  loadingMode?: boolean;
};
const Image = ({
  src,
  alt,
  height,
  width,
  loadingMode = false,
}: ImageProps) => {
  return (
    <div
      className={style.imageContainer}
      style={{ paddingTop: `${(height / width) * 100}%` }}
    >
      {!loadingMode && <img src={src} alt={alt} className={style.image} />}
      {loadingMode && (
        <div className={style.image}>
          <Skeleton width="100%" height="100%" />
        </div>
      )}
    </div>
  );
};

export default Image;
