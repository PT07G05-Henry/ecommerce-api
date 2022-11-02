const { User, Rol } = require("../../../db");

const changeRolUser = async (req, res) => {
    const userId = req.params.id
    const rolId = req.body.rol
    try {
        let user = await User.findByPk(userId)
        const rol = await Rol.findByPk(rolId)
        await user.setRols(rol, {through: 'users_rols'})
        user = await User.findByPk(userId, {
            include: [Rol]
        })
        res.status(200);
        res.send(user)
    } catch (error) {
        res.status(400);
        res.send(error.message)
    }
    
}

module.exports = { changeRolUser };
