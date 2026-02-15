const router = require('express').Router();
const users = require('../data/users');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 description: Имя пользователя
 *               email:
 *                 type: string
 *                 description: Почта пользователя
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *               confirmPassword:
 *                 type: string
 *                 description: Подтверждение пароля
 *     responses:
 *       200:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Ошибка валидации
 */


router.post("/register", (req, res)=>{
    const {name, email, password, confirmPassword} = req.body;
    if(users.find(u => u.email === email)) {
        return res.status(400).json({message: "Пользователь с такой почтой уже существует"});
    }
    if(password !== confirmPassword) {
        return res.status(400).json({message: "Пароли не совпадают"});
    }
    
    const user = {
        id:users.length + 1,
        name,
        email,
        password,
    }
    users.push(user);
    res.json({
        message: "Пользователь успешно зарегистрирован"
    });
} )
module.exports = router;