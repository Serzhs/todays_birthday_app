import style from './HomePage.module.scss';
import Typography from '../../../components/Typography/Typography';
import Button from '../../../components/Button/Button';
import Image from '../../../components/Image/Image';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <Typography variant="h1">
        Welcome, traveler! This webpage is dedicated to showcasing the famous
        individuals born today, based on Wikipedia. Enjoy exploring!
      </Typography>

      <Button
        label="Click here to discover who is celebrating their birthday today!"
        size="large"
        onClick={() => navigate('/birthday-today')}
      />
      <div className={style.imageWrapper}>
        <Image
          src="/assets/images/cake.png"
          alt="Birthday cake"
          width={844}
          height={980}
        />
      </div>
    </div>
  );
};

export default HomePage;
