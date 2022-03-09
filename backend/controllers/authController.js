const authService = require("../services/authService.js")
const bcrypt = require("bcrypt")
const createHttpError = require("http-errors");

const postLogin = async (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return next(createHttpError(400, "No username or password provided"))
    }
    const result = await authService.selectUserByUsername(req.body.username)
    if(result.rows.length !== 1) {
        return next(createHttpError(400, "Invalid email or password"))
    }
    if (!(await bcrypt.compare(req.body.password, result.rows[0].hash))) {
        return next(createHttpError(400, "Invalid email or password"))
      }
      req.session.authenticated = true
      req.session.data = {
          id: result.rows[0].id,
          username: result.rows[0].username
      }
      return res.status(200).json({ message: "succesfully authenticated" })
}

const postRegister = async (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return next(createHttpError(400, "No username or password provided"))
    }
    try {
        const result = await authService.selectUserByUsername(req.body.username)
        if(result.rows.length !== 0) {
            return next(createHttpError(400, "Username already in use")) // todoo: make unique in db
        }
        const hash = bcrypt.hashSync(req.body.password, 10);
        await authService.insertUser(req.body.username, hash)
      } catch (e) {
		return next(createHttpError(500, e));
      }
      return res.status(200).json({ message: "Registration successfull"})
}


const getLogout = (req, res) => {
    req.session.destroy()
    res.status(200).json({ message: "Successfully logged out"})
  }

module.exports = {
    postLogin,
    postRegister,
    getLogout
}