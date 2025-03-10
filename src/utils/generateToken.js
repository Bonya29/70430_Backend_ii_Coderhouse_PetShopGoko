import jwt from 'jsonwebtoken'
export const PRIVATE_KEY = 'Pet12Shop09Goko15'
export const generateToken = (userDataToken) => jwt.sign(userDataToken, PRIVATE_KEY, {expiresIn: '2h'})