import { Outlet, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';

import MainNavigation from '../components/MainNavigation';
import { getAuthToken, getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = getAuthToken();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }

    if(token === 'EXPIRED'){
      submit(null, {action : '/logout', method: 'POST'});
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    setTimeout(() => {
      submit(null, {action : '/logout', method: 'POST'});
    }, tokenDuration);
  });

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
