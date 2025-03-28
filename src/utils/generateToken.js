import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
export const generateToken = (userDataToken) => jwt.sign(userDataToken, config.privateKey, {expiresIn: '2h'})