import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const config = {
    port: process.env.port,
    mongoURI: process.env.mongoURI,
    privateKey: process.env.privateKey,
    mailUsername: process.env.mailUsername,
    mailPassword: process.env.mailPassword
}