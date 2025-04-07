import nodemailer from 'nodemailer'
import { config } from "./config.js"

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: config.mailUsername,
        pass: config.mailPassword
    }
})