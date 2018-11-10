var express = require('express');
var router = express.Router();
var pg = require('pg');

/* Connection string should be like this 'cause we are using pool connections -READ DOCUMENTATION- */
var connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '1234567',
  port: 5432,
};
var pool = new pg.Pool(connectionString);

/* Top active users query */
var topActiveQuery = "SELECT row_to_json(user_data) AS user FROM (SELECT u.id AS id, u.created_at AS createdAt, u.name AS name, " +
  "(SELECT COUNT(a.id) FROM applications a WHERE a.user_id = u.id AND a.created_at > current_date - interval '7 days') AS count, " +
  "(SELECT json_build_array(json_build_object('name', l.name)) FROM listings l WHERE l.created_by = u.id ORDER BY l.created_by DESC LIMIT 3) AS listings " +
  "FROM users u) user_data ORDER BY count DESC LIMIT $1 OFFSET $2;"
var topActivePerPage = 5;

/* User detail query */
var userQuery = "SELECT row_to_json(user_data) AS user FROM (SELECT u.id AS id, u.created_at AS createdAt, u.name AS name, " +
  "(SELECT json_build_array(c) FROM companies c INNER JOIN teams t ON t.company_id = c.id WHERE t.user_id = u.id) AS companies, " +
  "(SELECT json_build_array(l) FROM listings l WHERE l.created_by = u.id) AS createdListings, " +
  "(SELECT json_build_array(json_build_object('id', a.id, 'createdAt', a.created_at, 'listings', (SELECT l FROM listings l WHERE l.id = a.listing_id), 'coverLetter', a.cover_letter)) " +
  "FROM applications a WHERE a.user_id = u.id) AS applications FROM users u WHERE u.id = $1) user_data;";

/* This function remap the object whitout "row_to_json" PostgreSQL function as key of any object in the array */
function mapResult(data) {
  if (data.rows[0].user) {
    var mapedResult = [];
    data.rows.forEach(i => {
      mapedResult.push(i.user);
    });
    return mapedResult;
  }
  return data.rows;
}

/* GET top active users. */
router.get('/topActiveUsers', function (req, res) {
  var page = req.query.page || 1;
  pool.connect().then(client => {
    return client.query(topActiveQuery, [(page * topActivePerPage), ((page - 1) * topActivePerPage)]).then(response => {
      res.json(mapResult(response));
      res.end();
    }).catch(e => {
      console.log(e);
    }).then(() => client.release());
  });
});

/* GET users detail. */
router.get('/users', function (req, res) {
  var id = req.query.id || 1;
  pool.connect().then(client => {
    return client.query(userQuery, [id]).then(response => {
      res.json(mapResult(response)[0]);
      res.end();
    }).catch(e => {
      console.log(e);
    }).then(() => client.release());
  });
});

module.exports = router;
