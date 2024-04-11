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
    req: any,
    res: { setHeader: (arg0: string, arg1: string) => void },
    next: () => void
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
  .then((res: any) => {
    console.log("Connected");
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });

app.post(
  "/api/create",
  async (
    req: { body: any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { message: any }): void; new (): any };
      };
    }
  ) => {
    try {
      const ticket = await Ticket.create(req.body);
      res.status(201).json(ticket);
    } catch (error: any) {
      res.status(500).json({ message: error?.message });
    }
  }
);
app.get(
  "/api/getalldata/:clientId",
  async (
    req: { params: { clientId: string } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: any): void; new (): any };
      };
    }
  ) => {
    const ticket = await Ticket.find({ clientId: req.params.clientId });
    res.status(200).json(ticket);
  }
);
app.get(
  "/api/getdata/:clientId/:uniqueId",
  async (
    req: { params: { clientId: string; uniqueId: string } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: any): void; new (): any };
      };
    }
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
    req: { params: { id: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: any): void; new (): any };
      };
    }
  ) => {
    const ticket = await Ticket.findById(req.params.id);
    res.status(200).json(ticket);
  }
);
//searching particular data
app.post(
  "/api/search/:clientId",
  async (
    req: { params: { clientId: string },body:any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: any): void; new (): any };
      };
    }
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
    req: { params: { id: any }; body: any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { message: any }): void; new (): any };
      };
    }
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
    } catch (error: any) {
      console.log(error, "error while updating!!!!");
      res.status(500).json({ message: error?.message });
    }
  }
);
app.delete(
  "/api/removerecord/:id",
  async (
    req: { params: { id: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { message: any; product?: any }): void; new (): any };
      };
    }
  ) => {
    try {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);
      if (!ticket) {
        res.status(404).json({ message: "No Ticket found with this id!" });
      } else {
        res.status(200).json({ message: "Deleted Record" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error?.message });
    }
  }
);

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("API for CRUD !");
});
