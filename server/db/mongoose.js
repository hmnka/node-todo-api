require('dotenv').config()
var mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var dbname = 'TodoApp';

if (env === 'development') {
    dbname = 'TodoAppDev';
} else if (env === 'test') {
    dbname = 'TodoAppTest';
}

const user = process.env.DB_USER;
const password = process.env.DB_PASS;

const uri = `mongodb://${user}:${password}@cluster0-shard-00-00-2hgsc.mongodb.net:27017,cluster0-shard-00-01-2hgsc.mongodb.net:27017,cluster0-shard-00-02-2hgsc.mongodb.net:27017/${dbname}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true })
        .catch((e) => {
            console.log(e);
        });

module.exports = {
    mongoose: mongoose
};