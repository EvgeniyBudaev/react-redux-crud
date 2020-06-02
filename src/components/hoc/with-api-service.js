import React from 'react';
import { ApiServiceConsumer } from '../api-service-context';

export const withApiService = () => Wrapped => {
  return props => {
    return (
      <ApiServiceConsumer>
        {
          (apiService) => {
            return <Wrapped {...props} apiService={apiService} />
          }
        }
      </ApiServiceConsumer>
    );
  };
};