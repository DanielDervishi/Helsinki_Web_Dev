const mongoose = require('mongoose')

const url = process.env.MONGOOSE_URI

const entrySchema = mongoose.Schema({
    name: String,
    number: String
})
entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

mongoose.connect(url).then(result => { console.log('Connected to Server') })

module.exports = mongoose.model('Entry', entrySchema)




