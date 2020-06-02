import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import { ApiServiceProvider } from './components/api-service-context';
import { ApiService } from './api/api-service';
import { ErrorBoundary } from './components/error/error-boundary';
import { store } from './redux/store/store';

const apiService = new ApiService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
      <ApiServiceProvider value={apiService}>
        <Router>
          <App />
        </Router>
        </ApiServiceProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
