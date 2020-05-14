var express =  require("express") ;
var path = require('path');

const app = express();

app.use(express.json());
app.use('/', (request, response) => {
    response.sendFile(path.join(__dirname+'/public/index.html'));
})
app.listen(8080);