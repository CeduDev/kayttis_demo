import http from 'http';
import { app } from './app';
import 'dotenv/config';

const server = http.createServer(app);
app.set('env', process.env.NODE_ENV);

server.listen(process.env.PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} enviroment,\nlistening on port: ${process.env.PORT}`
  );
});
