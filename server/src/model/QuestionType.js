const {default :mongoose} = require('mongoose');

const AttemptSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    questionType: {
        type: String,
        enum: [
            'mcq_single',
            'mcq_multiple',
            'subjective'
        ],
        required: true
    }
})

module.exports = mongoose.model('Attempt',AttemptSchema);