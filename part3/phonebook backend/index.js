require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

// GET all resources
app.get("/api/persons", (_, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

// GET info
app.get("/info", (_, response) => {
  const requestTimestamp = new Date().toString();

  const htmlBody = `<p>Phonebook has info for ${persons.length} people</p>
  <p>${requestTimestamp}</p>`;

  response.send(htmlBody);
});

// GET single resource
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);

      response.status(400).json({ error: "malformatted id" });
    });
});

// DELETE single resource
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then((person) => {
      console.log(person);

      if (person) {
        console.log("dentro l'if");

        response.status(204).end();
      } else {
        console.log("dentro l'else");
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);

      response.status(400).json({ error: "malformatted id" });
    });
});

// POST
app.post("/api/persons", (request, response) => {
  const body = request.body;

  // if (persons.some((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((result) => {
    console.log(result);
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    response.json(person);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
