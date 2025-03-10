export const authorization = (role) => {
    return async (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(401).send({ status: "error", error: "No autorizado, falta de permisos" })
        }
        next()
    }
}