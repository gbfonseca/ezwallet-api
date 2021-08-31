import Express from 'express';
import setupMiddlewares from './middlewares';
const app = Express();
setupMiddlewares(app);
export default app;
