import './index.css';
import React from 'react';
import PageView from '../../components/PageView';

const PresidentPage: React.FC = () => {
  console.log('president')
  return (
    <PageView
      title="Presidential Elections"
      type="president"
    />
  );
};

export default React.memo(PresidentPage);
