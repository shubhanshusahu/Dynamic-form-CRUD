const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema(
  {
    clientId: {
      type: String,
      required: [true, "please send your Client ID!"],
    },
    uniqueId: {
      type: String,
      required: [true, "please send Unique ID of form!"],
    },
    dataBody:
    {
      type: Object,
      required: [true, "please send data of the form!"],
    }

  },

  { timestamps: true }
);
const Ticket = mongoose.model("ticket", TicketSchema);

module.exports = Ticket;
