const mongoose = require("mongoose");

// global.Promise is a reference to ES6 implementation
// mongoose's Promise library is deprecated
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect("mongodb://localhost/users_test", {useNewUrlParser: true});
    mongoose.connection
        .once("open", () => { done() })
        .on("error", error => {
            console.warn("Warning", error);
        });
});

beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});

