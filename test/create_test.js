const assert = require("assert");
const User = require("../src/user");

describe("Creating records", () => {
    it("saves a user", (done) => {
        const joe = new User({name: "joe"});

        joe.save()
            .then(() => {
                // isNew flag gets flipped to false once record saved into db
                assert(!joe.isNew);
                done();
            })
    })
});