const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/users');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'userOne@example.com',
    password: 'userOnePassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'userTwo@example.com',
    password: 'userTwoPassword'
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First todo'
},
{
    _id: new ObjectID(),
    text: 'Second todo',
    completed: true,
    completedAt: 1234
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos)
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]) 
    }).then(() => {
        done();
    });
};  

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};