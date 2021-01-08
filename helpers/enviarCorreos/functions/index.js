const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const express = require('express')
const cors = require('cors')
const emailAth = require('../../../lib/keys').gmailAuth
// const { projectManagement } = require('firebase-admin');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.use(cors({ origin: true }))

app.post('/enviarEmail', async (req, res) => {
  const { emailEmpresa, asunto, destino, mensaje } = req.body
  // const { tipoEmail } = req.body
  const isValidMessage = emailEmpresa && asunto && destino && mensaje
  if (!isValidMessage) {
    return res.status(400).send({ message: 'Datos incorrectos' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        apiKey: "AIzaSyCRe25D2g9eSG8udw-tntRZyCOZCYmg44w",
        authDomain: "august-edge-297217.firebaseapp.com",
        databaseURL: "https://august-edge-297217.firebaseio.com",
        projectId: "august-edge-297217",
        storageBucket: "august-edge-297217.appspot.com",
        messagingSenderId: "151095801714",
        appId: "1:151095801714:web:c33dcb081882ad7b56cfeb",
        measurementId: "G-70D9GTJJYC"
    }
  })

  const mailOptions = {
    from: emailEmpresa,
    to: destino,
    subject: asunto,
    text: mensaje
  }

  await transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.status(500).send({ 
        status: false,
        message: 'Ocurrió un problema al enviar el correo.'
      })
    }

    return res.send({ 
      status: true,
      message: 'email enviado'
    })
  })
})

module.exports.mailer = functions.https.onRequest(app)
