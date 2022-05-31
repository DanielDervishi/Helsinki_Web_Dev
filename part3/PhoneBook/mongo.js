const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
URL = `mongodb+srv://Admin:${password}@cluster0.3w0cx.mongodb.net/Phonebook?retryWrites=true&w=majority`

const entrySchema = mongoose.Schema({
    "name": String,
    "number": String
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length < 5) {
    console.log('phonebook:')
    mongoose.mongoose.connect(URL).then((result) => {
        Entry
            .find({})
            .then(persons => {
                persons.forEach(person => { console.log(person.name + ' ' + person.number) })

            }).then(() => { mongoose.connection.close() })
    })
} else {
    mongoose.connect(URL).then(result => {

        const entry = new Entry({
            name: process.argv[3],
            number: process.argv[4]
        })
        return entry.save()

    }).then(() => {
        console.log('Entry Saved')
    }).then(() => { mongoose.connection.close() })
}
