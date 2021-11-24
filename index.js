const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.sendFile(`${__dirname}/Pages/home.html`));
app.get('/ordenaLista', (req, res) => res.sendFile(`${__dirname}/Pages/list.html`));
app.get('/interlace?', (req, res) => res.sendFile(`${__dirname}/Pages/interlace.html`));

app.post('/ordenaLista', (req, res) => {
        var {salas} = req.body;
        var obj = JSON.parse(salas);
        var numero = obj.salaN;
        var letra = obj.salaS;
        
        numero.sort(function(a,b) {
            return a - b;
        });
        
        letra.sort();
        console.log(letra, numero);
  res.send("Resultado das listas ordenadas: "+JSON.stringify(numero)+" e " + JSON.stringify(letra));
});

app.post('/interlace?', (req, res) => {
var {interlaceData} = req.body;
var interObj = JSON.parse(interlaceData);
var intervaloA = interObj.intervaloA;
var intervaloB = interObj.intervaloB;
let result

intervaloA.filter(function(element) {
    if (intervaloB.indexOf(element) !== -1 ) {
        result = "true";
    } else {
        result = "false";
    }
})
res.send("Resultado: "+(result));
});


app.listen(8080, () => console.log('Express started at http://localhost:8080'));