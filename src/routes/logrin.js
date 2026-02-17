const router = require('express').Router();
const users = require('../data/users');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "secret";

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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 *       400:
 *         description: Неверные данные
 */

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Проверка, что email и пароль переданы
    if (!email || !password) {
        return res.status(400).json({ message: "Введите email и пароль" });
    }

    // 1. Поиск пользователя
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
    }

    // 2. Проверка пароля через bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Неверный пароль" });
    }

    // 3. Создание токена
    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email
        },
        secret,
        { expiresIn: "10d" }
    );

    // 4. Отправка ответа
    return res.json({
        message: "Вход выполнен успешно",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

module.exports = router;
