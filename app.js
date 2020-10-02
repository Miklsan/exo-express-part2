import express from 'express'
import { calc } from './src/calc.js'
const app = express()
const PORT = 7777
const IP_LOCAL = '192.168.1.52'

const wrapWithHtml = (req, res, next) => {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Exercices express 2</title>
  </head>
  <body>
    <p>${req.message}</p>
  </body>
</html>`
    req.message = html
    next()
}

const sendMessage = (req, res, next) => {
    res.send(req.message)
    next()
}

app.get('/', (req, res) => {
    req.message = 'Exercices express partie 2'
    next()
})

app.get('/get_current_time', (req, res, next) => {
    const date = new Date().toUTCString()
    req.message = date
    next()
})

app.get('/how_pass_data', (req, res, next) => {
    const msg = `Nos handlers agissent ainsi comme un middleware 
    (notion que l'on verra plus tard). Le principe est d'effectuer 
    des traitements entre l'arrivée de la requête et l'envoi de notre réponse. 
    les route handlers sont exécutés dans l'ordre dans lequel ils sont déclarés, 
    ils prennent un paramètre supplémentaires qui est next et doivent appeller next() 
    pour passer à l'handler suivant lorsque le traitement est terminé.`
    res.message = msg
    next()
})
app.use('/calc', calc)
app.use(wrapWithHtml)
app.use(sendMessage)

app.listen(PORT, IP_LOCAL, () => {
    console.log(`Example app listening at http://${IP_LOCAL}:${PORT}`)
})
