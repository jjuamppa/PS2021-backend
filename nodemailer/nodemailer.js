const nodemailer = require("nodemailer");

const createTrans = () => {
    const trasnport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "a2a2c2d7b2fe89",
            pass: "1101ea9d9849ad"
        }
    });
    return trasnport;
}

const sendMail = async() => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com, jjuamppa@gmail.com", // list of receivers
        subject: "Bienvenido ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Te damos la bienvenida a GiftCardHernando</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    return
}

exports.sendMail = () => sendMail();