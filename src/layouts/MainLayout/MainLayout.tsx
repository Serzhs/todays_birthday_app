import style from './MainLayout.module.scss';
import Image from '../../components/Image/Image';
import Typography from '../../components/Typography/Typography';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className={style.content}>
      <div>
        <header className={style.header}>
          <div className={style.logoWrapper}>
            <NavLink to="/">
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={150}
                height={60}
              />
            </NavLink>
          </div>
        </header>
        <div className={style.container}>
          <Outlet />
        </div>
      </div>
      <footer className={style.footer}>
        <Typography variant="body-1" textAlign="center">
          Made by Jānis Seržants
        </Typography>
      </footer>
    </div>
  );
};

export default MainLayout;
