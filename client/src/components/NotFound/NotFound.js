import React from 'react';
import { useTranslation } from 'react-i18next';
import '../NotFound/NotFound.css';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{t('pageNotFound')}</p>
    </div>
  );
};

export default NotFound;
