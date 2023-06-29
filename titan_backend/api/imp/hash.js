const { createHash} = require('crypto');

function hash(pass,login) {
    const salt = login
    const passHash = createHash("sha256")
        .update(pass)
        .update(createHash('sha256').update(salt, 'utf-8').digest('hex'))
        .digest('hex');
    return {
        salt: salt,
        hashedPass: passHash
    }
}

module.exports = hash