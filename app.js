const express = require('express');
const app = express();
require('dotenv').config();

var AWS = require('aws-sdk');

app.get('/', (req, res) => {
console.log("Leitura feita pelo sensor de gás = " + req.query.sensor);
    if(req.query.sensor > 300){
        Alerta();
    }
});

function Alerta() 
{    
    var params = {
        Message: '[TESTE IoT] ALERTA!!! Um vazamento de gás foi detectado',
       // PhoneNumber: '+' + '5583998047024',
        PhoneNumber: '+' + '5583993423910',
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': 'IoTAlert'
            }
        }
    };
    var publishTextPromise = new AWS.SNS({ apiVersion: '2019-09-27' }).publish(params).promise();
return publishTextPromise;

}


app.listen(3000, () => console.log('SMS Service Listening on PORT 3000'))

//http://localhost:3000/?sensor=301