




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// 6ooMrvL4P1Sx9ESP
// garidoctor 




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dpklxw3.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

  // middleware

  const logger = async(req, res, next) => {
    console.log('called' ,req.host, req.originalUrl);
    next()
  }


 

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

        const serviceCollection = client.db("gariDoctor").collection('services')
        const bookingCollection = client.db("gariDoctor").collection('bookings')
   
      // auth related api

      // app.post ('/jwt', logger, )
   
        app.post('/logOut' , async(req, res) => {
          const user = req.body;
          console.log('loggin out' , user);
          res
          .clearCookie('token' ,  {maxAge: 0})
          .send({success: true})
        })
   
   
        // services related api
        app.get('/services' ,logger, async(req, res) => {
            const cursor = serviceCollection.find()
            const result =await cursor.toArray()
            res.send(result)
        })

        app.get('/services/:id' , async(req, res) => {
            const id = req.params.id;
            const query = {_id : new ObjectId(id)}
            const options = {
               
                // Include only the `title` and `imdb` fields in the returned document
                projection: { title: 1, img:1, price:1, },
              };
            const result =await serviceCollection.findOne(query, options);
            res.send(result)
        })

        // bookings

        app.get('/bookings', logger, verifyToken,  async (req, res)=> {
          console.log(req.query.email);
          // console.log('tok tok token' , req.cookies.token);
          console.log('from valid token',req.user);

          if(req.query.email  !== req.query.email ) {
              return res.status(403).send({message: 'forbidden access'})
          } 

          let query = {}
          if(req.query?.email) {
            query = {email: req.query.email}
          }
          const cursor = bookingCollection.find(query);
          const result = await cursor.toArray();
          res.send(result)
        })

        app.post('/bookings' , async(req, res) => {
          const bookings = req.body;
          const result = await bookingCollection.insertOne(bookings);
          res.send(result)
        })

        app.patch('/bookings/:id' , async(req, res) => {
          const id = req.params.id;
          const filter = {_id : new ObjectId(id)}
         const updatedBooking = req.body;
         console.log(updatedBooking);
         const updateDoc = {
          $set: {
            status: updatedBooking.status
          },
        };

        const result = await bookingCollection.updateOne(filter, updateDoc)
         res.send(result)
        })

        app.delete('/bookings/:id' , async(req, res) => {
          const id = req.params.id;
          const query = {_id : new ObjectId(id)}
          const result = await bookingCollection.deleteOne(query)
          res.send(result)
        })





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
