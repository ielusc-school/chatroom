module.exports = (application) => {
  application.get('/', ( req, res) => {
    // res.render('index');
    // EXPRESS APP MODULE FILE METHOD
    application.app.controllers.index.home(application, req, res);
  })
}