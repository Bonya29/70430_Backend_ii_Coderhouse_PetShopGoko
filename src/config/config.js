import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const config = {
    port: process.env.port,
    mongoURI: process.env.mongoURI,
    privateKey: process.env.privateKey
}