const express = require('express');
const routes = express.Router();
const uploadUser = require("./middlewares/uploadImage");

const CategoriasController = require('./controllers/CategoriasController');
const UsersController = require('./controllers/UsersController');
const MoviesController = require('./controllers/MoviesController');
const EnquetesController = require('./controllers/EnquetesController');
const VotoController = require('./controllers/VotoController');

const PostController = require('./controllers/PostController');
const MailController = require('./controllers/MailController');

const AdminController = require('./controllers/AdminController');

const CoffeeController = require('./controllers/CoffeeController');
const UploadController = require('./controllers/UploadController');

const ContatosController = require('./controllers/ContatosController');
const SecretController = require('./controllers/SecretController');
const ProductsController = require('./controllers/ProductsController');

const CarCmpController = require('./controllers/carCmpController');

routes.get('/users', UsersController.index);
routes.get('/signIn/:email/:password', UsersController.signIn);
routes.post('/newuser', UsersController.create);
routes.get('/searchUser/:idUsr', UsersController.searchUser);
routes.put('/newpassword/:emailUsuario', UsersController.updPassword);
routes.get('/verUsuario/:email', UsersController.searchEmail);

routes.get('/admin', AdminController.index);
routes.get('/loginAdm/:email/:password', AdminController.signIn);
routes.post('/newadmin', AdminController.create);
routes.get('/searchAdmin/:idAdm', AdminController.searchAdmin);
routes.put('/newSenhaAdmin/:emailAdmin', AdminController.updPassword);

routes.get('/categorias', CategoriasController.index);
routes.post('/newcategory', CategoriasController.create);
routes.put('/altcategoria/:idCat', CategoriasController.updCategoria);
routes.get('/searchCategoria/:idCat', CategoriasController.searchCat);
routes.put('/delCategoria/:idCat', CategoriasController.delCategoria);

routes.get('/movies', MoviesController.index);

routes.get('/tableMovies', MoviesController.tableMovies);
routes.get('/searchMovie/:idMov', MoviesController.searchMovie);
routes.get('/searchMovYear/:anoMovies', MoviesController.searchYear);
routes.get('/searchMovCat/:anoMovies/:idCat', MoviesController.searchCat);

routes.post('/newmovie', MoviesController.create);
routes.put('/altmovie/:idMov', MoviesController.updMovie);
routes.put('/delmovie/:idMov', MoviesController.delMovie);

routes.get('/enquetes', EnquetesController.index);
routes.post('/newenquete', EnquetesController.createEnq);

routes.post('/insertMov', EnquetesController.insertEnq);
routes.get('/movEnquetes/:IdMovie', EnquetesController.enquetesMov);

routes.put('/altenquete/:idEnq', EnquetesController.updEnquete);
routes.get('/searchEnquete/:idEnq', EnquetesController.searchEnq);

routes.get('/apuracao/:anoEnq/:idEnq', VotoController.searchEnq);
routes.post('/newvoto', VotoController.create);
routes.post('/vinenquete', VotoController.vinenquete);
routes.get('/searchEnqMovie/:idMov/:anoEnq', VotoController.searchEnqMovie);

//routes.get('/envEmail/:email', PostController.searchUser);
routes.get('/envEmail/:email', MailController.enviaEmail);

routes.post('/uploadImage', uploadUser.single('image'), UploadController.upload);

routes.get('/contatos', ContatosController.index);
routes.get('/searchCont/:idUsr', ContatosController.searchContatos);
routes.get('/escolha/:cntEscolhido', ContatosController.escolha);

routes.get('/secretarias', SecretController.index);
routes.post('/newsecretaria', SecretController.create);
routes.get('/altsecretaria/:idSec', SecretController.searchSecret);

routes.get('/products', ProductsController.index);
routes.get('/linhas', ProductsController.readLinhas);
routes.get('/detproduct/:proId', ProductsController.detProduct);

routes.post('/newprocar', CarCmpController.carcompras);

module.exports = routes;
