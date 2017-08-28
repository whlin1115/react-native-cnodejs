import React from 'react';
import dva from 'dva/mobile';
import Navigation from './navigation';

const app = dva();

app.router(() => <Navigation />);
export default app.start()
