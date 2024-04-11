const express = require("express");
let mongoose = require("mongoose");
let Ticket = require("./models/product.model");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  (
   req,res,next
  ) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
  }
);

mongoose
  .connect(
    "mongodb+srv://shubhanshuoffice:hF4TXsYXRF4bvJls@cluster0.78ee8ns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(res => {
    console.log("Connected");
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });

app.post(
  "/api/create",
  async (req,res
  ) => {
    try {
      const ticket = await Ticket.create(req.body);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  }
);
app.get(
  "/api/getalldata/:clientId",
  async (
    req,res
  ) => {
    const ticket = await Ticket.find({ clientId: req.params.clientId });
    res.status(200).json(ticket);
  }
);
app.get(
  "/api/getdata/:clientId/:uniqueId",
  async (
    req,res
  ) => {
    const ticket = await Ticket.find({
      clientId: req.params.clientId,
      uniqueId: req.params.uniqueId,
    });
    res.status(200).json(ticket);
  }
);
app.get(
  "/api/getrecordusingid/:id",
  async (
  req,res
  ) => {
    const ticket = await Ticket.findById(req.params.id);
    res.status(200).json(ticket);
  }
);
//searching particular data
app.post(
  "/api/search/:clientId",
  async (
   req,res
  ) => {

  // let values = Object.values(req.body)
  //   let keys = Object.keys(req.body).map( (k,i) => {
  //     return [['dataBody.'+k] :[values[i]]]
  //   } )
    

    // console.log(keys)

    const ticket = await Ticket.findOne({
      // dataBody :req.body,
      clientId:req.params.clientId 
    });
      // {clientId:req.params.clientId ,  dataBody.name': 'client sahu' });

      // { dataBody: { age: 13 } }
      // function (err: any, docs: any) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("Second function call : ", docs);
      //   }
      // }

    console.log(ticket);
    // const ticket = await Ticket.findById(req.params.id);
    res.status(200).json(ticket);
  }
);

app.put(
  "/api/changedata/:id",
  async (
  req,res
  ) => {
    try {
      const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body);
      if (!ticket) {
        res.status(404).json({ message: "No Ticket found with this id!" });
      } else {
        console.log("updated ", ticket);
      }
      const updatedTicket = await Ticket.findById(req.params.id);
      res.status(200).json(updatedTicket);
    } catch (error) {
      console.log(error, "error while updating!!!!");
      res.status(500).json({ message: error?.message });
    }
  }
);
app.delete(
  "/api/removerecord/:id",
  async (
   req,res
  ) => {
    try {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);
      if (!ticket) {
        res.status(404).json({ message: "No Ticket found with this id!" });
      } else {
        res.status(200).json({ message: "Deleted Record" });
      }
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  }
);

app.get("/", (req,res) => {
  res.send("API for CRUD !");
});
