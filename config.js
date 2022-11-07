const { credential } = require("firebase-admin")
const firebase = require("firebase-admin")
const serviceAccount = require('./gdsc-backend-firebase-adminsdk-gyv0k-dde3fe0215.json');

firebase.initializeApp({
    credential: credential.cert(serviceAccount)
})

const database = firebase.firestore()
const Users = database.collection("users")

module.exports = Users