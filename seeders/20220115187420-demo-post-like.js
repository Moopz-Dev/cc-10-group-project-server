'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'post_likes',
            [
                {
                    user_id: 3,
                    post_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 4,
                    post_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 5,
                    post_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 5,
                    post_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 2,
                    post_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('post_likes', null, {});
    },
};
