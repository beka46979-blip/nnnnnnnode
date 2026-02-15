const router = require('express').Router();
const users = require('../data/users');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const secret = "secret"
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Вход пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Почта пользователя
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *     responses:
 *       200:
 *         description: Успешный вход
 *       400:
 *         description: Неверные данные
 */

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const token = jwt.sign({
			id:user.id,
			name:user.name,
			email:user.email,
		},secret,
	{expiresIn:"10d"});


    // Проверяем существует ли пользователь
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({
            message: "Пользователь не найден"
        });
    }

    // Проверяем пароль
    if (user.password !== password) {
        return res.status(400).json({
            message: "Неверный пароль"
        });
    }

    res.json({
        message: "Вход выполнен успешно",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

module.exports = router;
