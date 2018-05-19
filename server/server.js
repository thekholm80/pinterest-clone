const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { graphqlexpress, graphiqlexpress } = require('apollo-server-express');

// dev only: remove
const cors = require('cors');

const { PORT } = require('./utils/config');
const mongoConnector = require('./utils/mongoConnector');
const schema = require('./schema');

const start = async () => {
  /**
   * Starts up the back end
   *  ~ connects to database
   *  ~ sets middleware
   *  ~ defines endpoints
   */

  const app = express();
  const mongo = await mongoConnector().catch(err => { throw err; });

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser());
  app.use(bodyParser.text({ type: 'application/graphql' }));

  // dev only: remove
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };

  // dev only: remove cors
  app.get('/api', bodyParser.json(), cors(corsOptions), graphqlexpress((req, res) => ({
    context: { mongo, req, res },
    schema
  })));

  // dev only: remove
  app.get('/graphiql', graphiqlexpress({
    endpointURL: '/api'
  }));

  // dev only: res.sendFile(path.join(__dirname, 'public', 'index.html'));
  app.get('/', (req, res) => {
    res.send('Coming soon');
  });

  app.listen(PORT);
};

start();
