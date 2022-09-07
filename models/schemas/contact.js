const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema, SchemaTypes, model } = mongoose;

const contactSchema = new Schema(
    {
        name: {
            type:String,
            required: [true, 'Type name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
          }
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

contactSchema.plugin(mongoosePaginate);

 const Contact = mongoose.model('contact', contactSchema);

 module.exports = Contact;
