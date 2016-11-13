import React from 'react';

import Navigation from './Navigation';

export const AppLayoutView = ({
  children,
}) => (
  <div>
    <Navigation />
    <div className="container">
      {children}
    </div>
  </div>
);

const AppLayout = (AppLayoutView);

export default AppLayout;
