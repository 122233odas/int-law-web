const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Database Connection
const sequelize = require('./config/database');

// Middleware Configuration
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session Setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
}));

// i18n Configuration
i18n.configure({
    locales: ['en', 'fr', 'es'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    cookie: 'lang',
    queryParameter: 'lang',
    autoReload: true,
    updateFiles: false,
    objectNotation: true
});
app.use(i18n.init);

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global Middleware to make user and i18n available in views
app.use((req, res, next) => {
    res.locals.locale = req.getLocale();
    res.locals.user = req.session.user || null;
    res.locals.currentPath = req.path;
    next();
});

// Routes
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const treatyRoutes = require('./routes/treatyRoutes');
// const glossaryRoutes = require('./routes/glossaryRoutes'); // To be implemented
// const oigRoutes = require('./routes/oigRoutes'); // To be implemented
// const caseRoutes = require('./routes/caseRoutes'); // To be implemented
// const forumRoutes = require('./routes/forumRoutes'); // To be implemented

app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/treaties', treatyRoutes);

// Error Handling
app.use((req, res, next) => {
    res.status(404).render('pages/404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/500', { title: 'Internal Server Error' });
});

// Server Start
const PORT = process.env.PORT || 3000;

// Sync Database (in development)
// Sync Database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
    // Still start the server so we can see logs/errors in browser if possible
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (DB Connection Failed)`);
    });
});

module.exports = app;
