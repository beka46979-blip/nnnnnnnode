const router = require('express').Router();
const users = require('../data/users');
const auth = require('../middleware/auth');
/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Hello World
 *     description: Get user by name
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: User name
 *      
 *     responses:
 *       200:
 *         description: A successful response
 */

router.get('/', auth, (req, res) => {
    const { name } = req.query;

    const filtered = users.find(u => u.name === name);
    if(!filtered) {
        return res.status(200).json(users);
    }
    res.json(filtered);
})



module.exports = router;
