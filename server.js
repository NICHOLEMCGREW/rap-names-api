const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

app.use(cors())
 app.set('view engine', 'ejs')
 app.use(express.static('public'))
 app.use(express.urlencoded({ extended: true }))
 app.use(express.json())

// const rappers = {
//     '21 savage': {
//         'stageName': '21 savage',
//         'birthName': 'Sheyaa Bin Abraham-Joseph',
//         'birthLocation': 'London, England'
// },
//     'chance the rapper': {
//         'stageName': 'chance the rapper',
//         'birthName': 'Chancelor Bennett',
//         'birthLocation': 'Chicago, Illinois'
// },
//     'unknown': {
//         'stageName': 'unknown',
//         'birthName': 'unknown',
//         'birthLocation': 'unknown'
// }
// }

app.get('/', (req, res) => {
    db.collection('rappers').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('/index.ejs', { info: data })
    })
    .catch(error => console.log(error))
})

app.post('/addRapper', (req, res) => {
    db.collection('rappers').insertOne({stageName: req.body.stageName,
    birthName: req.body.birthName, likes: 0})
    .then(res => {
        console.log('Rapper Added')
        res.redirect('/')
    })
    .catch(error => console.log(error))
})

app.put('/addOneLike', (req, res) => {
    db.collection('rappers').updateOne({stageName: req.body.stageNameS,
    birthName: req.body.birthNameS, likes: req.body.likesS}, {
        $set: {
            likes.req.body.likesS + 1
        }
    }, {
        sort: {_id: -1},
        upsert: false
    })
    .then(res => {
        console.log('Added One Like')
        res.json('Like Added')
    })
    .catch(error => console.log(error))
})

app.delete('/deleteRapper', (req, res) => {
    db.collection('rappers').deleteOne({stageName: req.body.stageNameS})
    .then(res => {
        console.log('Rapper Deleted')
        res.json('Rapper Deleted')
    })
    .catch(error => console.log(error))
})

// app.get('/api/:name', (req, res) => {
//     const rapperName = req.params.name.toLowerCase()
//     if (rappers[rapperName]) {
//         res.json(rappers[rapperName])
//     } else {
//         res.json(rappers['unknown'])
//     }
// })

app.listen(PORT, () => {
    console.log(`The server is now running on port ${PORT}! Betta go catch it!`)
})