'use strict';
var bcrypt = require("bcrypt");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // const customer1 = await stripe.customers.create({
    //   email: 'tester1@example.com',
    //   name: 'Tester 1',
    // });

    // const customer2 = await stripe.customers.create({
    //   email: 'tester2@example.com',
    //   name: 'Tester 2',
    // });

    // const customer3 = await stripe.customers.create({
    //   email: 'tester3@example.com',
    //   name: 'Tester 3',
    // });

    await queryInterface.bulkInsert('users', [
      {
     
        firstName: 'Tester',
        lastName: '1',
        email: 'tester1@example.com',
        password: bcrypt.hashSync("123456", 8),
        nickName: 'Tester 1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
      
        firstName: 'Tester',
        lastName: '2',
        email: 'tester2@example.com',
        password: bcrypt.hashSync("123456", 8),
        nickName: 'Tester 2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
      
        firstName: 'Tester',
        lastName: '3',
        email: 'tester3@example.com',
        password: bcrypt.hashSync("123456", 8),
        nickName: 'Tester 3',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
