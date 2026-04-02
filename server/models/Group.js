import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  status: { 
    type: String, 
    enum: ['invitation_sent', 'accepted', 'credential_issued'],
    default: 'invitation_sent'
  },
  token: { type: String }, // For the invitation link
  issuedAt: { type: Date }
});

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  designId: { type: String }, // Can be a local ID or design name
  designDetails: {
    color: String,
    orientation: String,
    name: String,
    bgImage: String
  },
  ownerId: { type: String, default: 'admin' },
  members: [memberSchema],
  createdAt: { type: Date, default: Date.now }
});

const Group = mongoose.model('Group', groupSchema);
export default Group;
