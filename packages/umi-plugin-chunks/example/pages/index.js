import React from 'react';
import _ from 'lodash';
import styles from './index.css';

export default function () {
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      {_.get({ a: 1 }, 'a')}
    </div>
  );
}
