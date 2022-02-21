'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'post_comment_likes',
            [
                {
                    user_id: 2,
                    post_comment_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 3,
                    post_comment_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 5,
                    post_comment_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 3,
                    post_comment_id: 4,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 4,
                    post_comment_id: 5,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('post_comment_likes', null, {});
    },
};
