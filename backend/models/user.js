const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.mongoose.Schema({
    avatar: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hash = await bcrypt.hash(this.password, 8);
        this.password = hash;
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compareSync(password, this.password);
    return result;
};

module.exports = mongoose.model('User', userSchema);