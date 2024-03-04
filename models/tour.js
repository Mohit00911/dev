const mongoose = require('mongoose');
const tourDetailsSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default:null
   
  },
  name: {
    type: String,
    default:null
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
   type:String,

  },
  vendorName:{
    type: String,
    default:null
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendors',
  },
  location: {
    type: String,
    default:null
   
  },
  isGroup:{
    type:Boolean
  },
  images: [
    {
      type: String, 
    },
  ],
  cost: {
    type: String,
   
  },
  duration: {
    type: String,
   
  },
  group: {
    type: Boolean,
    default: false,
  },
  groupSize: {
    type: String,
    // Add any specific validation for group size if needed
  },
  transportation: {
    type: Boolean,
    default: false,
  },
  cancellationPolicy: {
    type: String,
    
  },
  overview: {
    type: String,
   
  },
  languages: [
    {
      type: String,
    },
  ],
  highlights: [
    {
      type: String,
    },
  ],
  whatsIncluded: 
  {
    type: String,
   
  },
  whatsExcluded: 
  {
    type: String,
   
  },
  availableDates: 
  {
    type: String,
   
  },
  departureDetails:{
    type: String,
  }
  ,
  inclusions: 
  {
    type: String,
   
  },
  exclusions:{
    type: String,
  },
  knowBeforeYouGo: 
  {
    type: String,
   
  },
  additionalInfo:{
    type: String,
  }
}
);

const Tour = mongoose.model('Tour', tourDetailsSchema);

module.exports = Tour;
