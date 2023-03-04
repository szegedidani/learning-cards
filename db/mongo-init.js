/* eslint-disable no-undef */

db.createUser(
    {
        user: "learning",
        pwd: "aT33gXgxzzd2ZUL36udY52P9RGnD3tFg",
        roles: [
            {
                role: "readWrite",
                db: "vocabulary"
            }
        ]
    }
);