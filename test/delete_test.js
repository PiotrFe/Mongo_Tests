const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
    // 4 different ways to remove a record
    // in model class: remove, findOneAndRemove, findByIdAndRemove
    // in model instance: remove

    let joe;

    beforeEach((done) => {
        joe = new User({ name: "Joe" });
        joe.save()
            .then(() => done());
    });

    it("model instance remove", (done) => {
        joe.remove()
            .then(() => User.findOne({ name: "Joe" }))
            .then((user) => {
                assert(user === null);
                done();
            })
    })

    it("class method delete", (done) => {
        User.deleteMany({ name: "Joe" })
            .then(() => User.findOne({ name: "Joe" }))
            .then((user) => {
                assert(user === null);
                done();
            })
    })

    it("class method findOneAndDelete", (done) => {
        User.findOneAndDelete({ name: "Joe" })
            .then(() => User.findOne({ name: "Joe" }))
            .then((user) => {
                assert(user === null);
                done();
            })
            .catch((err) => console.log(err));
    })

    it("class method findByIdAndRemove", (done) => {
        User.findByIdAndDelete(joe._id)
            .then(() => User.findOne({ name: "Joe" }))
            .then((user) => {
                assert(user === null);
                done();
            })
    });
});