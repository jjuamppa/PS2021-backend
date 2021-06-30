// const fs = require('fs')

// const webHook = (req, res) => {

//     console.log(req.body)
//     let data = req.body

//     if (data['action'] == 'payment.created') {
//         fs.writeFileSync(`${__dirname}/../webHookResponses.json`, JSON.stringify(data))
//     }

//     res.status(200).send({ result: 'ok', message: 'thansk MP' })
// }

// module.exports = { webHook }