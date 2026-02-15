const router = require('express').Router();
const users = require("../data/users")
const auth = require('../middleware/auth');


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     description: Removes a user from the list by id
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: User id
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', auth, (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = users.splice(index, 1)[0];

  return res.json({
    message: 'User deleted',
    user: deletedUser
  });
});

module.exports = router;