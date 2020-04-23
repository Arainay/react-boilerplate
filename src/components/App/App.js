import React, { lazy, useState } from 'react';
import './app.scss';

const PrefetchedComponent = lazy(() => import(/* webpackPrefetch: true */ '@app/components/PrefetchedComponent'));

const App = () => {
  const [prefetch, setPrefetch] = useState(false);

  const togglePrefetch = () => {
    setPrefetch(prefetch => !prefetch);
  };

  if (prefetch) {
    return <PrefetchedComponent/>;
  }

  return (
    <h1 onClick={togglePrefetch}>App</h1>
  );
};

export default App;
