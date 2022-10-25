import nodemailer from 'nodemailer'


export const passwordEmailAdapter = {
    async sendPasswordOnEmail (email: string, code: string) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "saidparsermail@gmail.com",
                pass: "kofignlwgnictwgn",
            }})

        let info = await transporter.sendMail({
            from: 'Said', // sender address
            to: email, // list of receivers
            subject: "Recovery Password", // Subject line
            text: "Hello friends, I'am five age!", // plain text body
            html: " <h1>Password recovery</h1>\n" +
                "       <p>To finish password recovery please follow the link below:\n" +
                `         <a href='https://somesite.com/password-recovery?recoveryCode=your_recovery_code'>recovery password</a>\n` +
                "      </p>", // html body
        })
        return info
    }
}