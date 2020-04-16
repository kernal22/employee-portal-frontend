const bcrypt = require('bcrypt');

module.exports = {
    encryptPassword: (palinText) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(palinText, salt);
      },

    comparePassword: (plainText, encrypedPassword) => {
        return bcrypt.compareSync(plainText, encrypedPassword);
    },
}