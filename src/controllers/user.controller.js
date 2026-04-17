import  User  from '../models/user.model.js';

/**
 * TODO: List all users (Admin only)
 *
 * 1. Find all users (password excluded by default)
 * 2. Return 200 with { users }
 */
export async function listUsers(req, res, next) {
  try {
    // Your code here
    if (!(req.user.role === 'admin')) {
      return res.status(403).json({
        message: 'Only Admin can access'
      })
    }
    const users = await User.find()

    return res.status(200).json({ users })
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Get user by ID (Admin only)
 *
 * 1. Extract id from req.params
 * 2. Find user by id (password excluded by default)
 * 3. If not found: return 404 with { error: { message: "User not found" } }
 * 4. Return 200 with { user }
 */
export async function getUser(req, res, next) {
  try {
    // Your code here
    if (!(req.user.role === 'admin')) {
      return res.status(403).json({
        message: 'Only Admin can access'
      })
    }
    const userId = req.params.id
    const user = await User.findById(userId)
    if(!user) return res.status(404).json({ error: { message: "User not found" } })

    return res.status(200).json({ user })
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Delete user (Admin only)
 *
 * 1. Extract id from req.params
 * 2. Delete user by id
 * 3. If not found: return 404 with { error: { message: "User not found" } }
 * 4. Return 200 with { message: "User deleted successfully" }
 */
export async function deleteUser(req, res, next) {
  try {
    // Your code here
    if (!(req.user.role === 'admin')) {
      return res.status(403).json({
        message: 'Only Admin can access'
      })
    }

    // const userId = req.params.id
    // const userDelete = await User.deleteOne({ _id: userId})

    const user = req.params // this return the object so we need to extract the id fromt this 
    const userDelete = await User.deleteOne({ _id: user.id})
    if (userDelete.deletedCount === 0) {
      return res.status(404).json({ error: { message: "User not found" } })
    }

    return res.status(200).json({ message: "User deleted successfully" })

  } catch (error) {
    next(error);
  }
}
