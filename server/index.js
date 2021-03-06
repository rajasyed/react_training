import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
import users from './routes/users.js';
import bodyParser from 'body-parser';

let app = express();

const compiler = webpack(webpackConfig);


app.use(webpackMiddleware(compiler,{
  hot:true,
  publicPath: webpackConfig.output.publicPath,
  noInfo:true
}));

app.use(bodyParser.json());

app.use(webpackHotMiddleware(compiler));

app.use("/api/users",users);

app.get("/*", (req,res) => {
  // res.send('hello world');
  res.sendFile(path.join(__dirname,"./index.html"));
});

app.listen(3000, () => console.log('Server is running...!!!'));
