import React, { CSSProperties } from 'react';
import styles from './Typography.module.scss';

const variantToElement: Record<string, keyof JSX.IntrinsicElements> = {
  'display-1': 'div',
  'display-2': 'div',
  'display-3': 'div',
  'display-4': 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  'body-1': 'p',
  'body-2': 'p',
  'subtitle-1': 'div',
  'subtitle-2': 'div',
  caption: 'span',
  overline: 'span',
};

type TypographyProps = {
  variant:
    | 'display-1'
    | 'display-2'
    | 'display-3'
    | 'display-4'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'body-1'
    | 'body-2'
    | 'subtitle-1'
    | 'subtitle-2'
    | 'caption'
    | 'overline';
  children: React.ReactNode;
  textAlign?: CSSProperties['textAlign'];
};

const Typography = ({ variant, textAlign, children }: TypographyProps) => {
  const Component = variantToElement[variant];

  return (
    <Component className={styles[variant]} style={{ textAlign }}>
      {children}
    </Component>
  );
};

export default Typography;
