const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsageDetailSchema = mongoose.model('UsageDetail', new mongoose.Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'user' },
    time_unix: { type: Number, required: false },
    systemDetails : {type : Object},
    cache : {type : Number},
    cpuUsage : {type : Number},
    usedMemory : {type : String},
    check_net : {type : Object},
},{
    collection: 'UsageDetail'
 }));
 module.exports = UsageDetailSchema;