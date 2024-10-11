import styles from './Skeleton.module.scss';

type SkeletonProps = {
  width?: string;
  height?: string;
};

const Skeleton = ({ width = '100%', height = '1rem' }: SkeletonProps) => {
  return (
    <div
      className={styles.skeleton}
      style={{
        width,
        height,
      }}
    />
  );
};

export default Skeleton;
