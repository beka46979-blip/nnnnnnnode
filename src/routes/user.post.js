const router = require('express').Router();
const users = require('../data/users');

/**
 * @swagger
 * /user/create/:
 *   post:
 *     summary: Создать пользователя
 *     description: Создать пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Имя пользователя
 *               age:
 *                 type: number
 *                 description: Возраст пользователя
 *               email:
 *                 type: string
 *                 description: Почта пользователя
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *     responses:
 *       200:
 *         description: A successful response
 * 
 */

router.post('/', (req, res) => {
    const { name, age, email, password } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        age,
        email,
        password
    }
    users.push(newUser);
    res.json({
        message:"Пользователь успешно создан",
        user: newUser
    });
})



module.exports = router;
