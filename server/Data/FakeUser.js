const mongoose = require("mongoose");
const User = require("../models/usersModel.js"); // सुनिश्चित करें कि सही path हो
const faker = require("faker");

mongoose.connect(process.env.ONLINE_DB);

const createRandomUsers = async () => {
  try {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        image: faker.image.avatar(),
        filename: faker.system.fileName(),
        name: faker.name.findName(),
        role: faker.name.jobTitle(),
        email: faker.internet.email(),
        number: faker.datatype.number({ min: 6000000000, max: 9999999999 }),
        address: faker.address.streetAddress(),
        dob: faker.date.past(30, new Date("2000-01-01")),
        gender: faker.random.arrayElement(["Male", "Female"]),
        password: faker.internet.password(),
        self_todo: [],
      });
    }

    await User.insertMany(users);
    console.log("10 random users created successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating users:", error);
    mongoose.connection.close();
  }
};

createRandomUsers();
