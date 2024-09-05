const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set the views directory
app.set("views", path.join(__dirname, "views"));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs({
    partialsDir: "views",
  })
);
app.get("/leaflettest", (req, res) => {
  res.render("leaflettest");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
