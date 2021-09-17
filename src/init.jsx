import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { configureStore } from '@reduxjs/toolkit';
import { AuthContextProvider } from './context/authContext.jsx';
import { SocketContextProvider } from './context/socketContext.jsx';
import channelsDataReducer from './slices/channelsDataSlice.js';
import messagesDataReducer from './slices/messagesDataSlice.js';
import modalDataReducer from './slices/modalDataSlice.js';
import rollbarConfig from './rollbar.js';
import resources from './locales/index.js';
import Error404 from './components/Error404.jsx';
import App from './components/App.jsx';

export default async (socket) => {
  const store = configureStore({
    reducer: {
      channelsData: channelsDataReducer,
      messagesData: messagesDataReducer,
      modalData: modalDataReducer,
    },
  });

  const instance = i18n.createInstance();
  await instance
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      debug: false,
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={() => <Error404 />}>
        <I18nextProvider i18n={instance}>
          <AuthContextProvider>
            <SocketContextProvider socket={socket} store={store}>
              <ReduxProvider store={store}>
                <App />
              </ReduxProvider>
            </SocketContextProvider>
          </AuthContextProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
