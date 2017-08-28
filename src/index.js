import React from 'react';
import dva from 'dva/mobile';
import models from './model';
import Navigation from './navigation';

const app = dva();

Object.keys(models).map(key => app.model(models[key]));

app.router(() => <Navigation />);
export default app.start()
