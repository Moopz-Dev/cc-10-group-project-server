'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'post_comments',
            [
                {
                    user_id: 3,
                    post_id: 1,
                    message: 'Test test bro!!',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 4,
                    post_id: 1,
                    message: 'Hello my friend',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 5,
                    post_id: 1,
                    message: 'One two three hello test',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 5,
                    post_id: 2,
                    message: 'LOL',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 2,
                    post_id: 3,
                    message: 'Oh Yeah~~',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 4,
                    post_id: 3,
                    message: 'Oh Baby~~',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('post_comments', null, {});
    },
};
