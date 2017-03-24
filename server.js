'use strict';

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cards');
app.use('/',express.static(path.join(__dirname,"/")));

var cards = require('./models/cards');
const Card = ['A S', '2 S', '3 S', '4 S', '5 S', '6 S', '7 S', '8 S', '9 S', 'T S', 'J S', 'Q S', 'K S', 'A D', '2 D', '3 D', '4 D', '5 D', '6 D', '7 D', '8 D', '9 D', 'T D', 'J D', 'Q D', 'K D', 'A H', '2 H', '3 H', '4 H', '5 H', '6 H', '7 H', '8 H', '9 H', 'T H', 'J H', 'Q H', 'K H', 'A C', '2 C', '3 C', '4 C', '5 C', '6 C', '7 C', '8 C', '9 C', 'T C', 'J C', 'Q C', 'K C'];

app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json


app.get('/cards', function(req, res){
    var newCard = GenerateCards(shuffling(Card));
    var newPoint = CalPercentage(newCard);
    var newPro = new cards();
    newPro.cardArr = newCard;
	newPro.percentage = newPoint;
    
    newPro.save(function(err) {
        if (err)
            res.send(err);
        cards.find(function(err, cards) {
            if (err)
                res.send(err);
            res.json(newPro);
            console.log(cards.length);
        });
    });
});
app.get('/avepoint', function(req, res){
    cards.find(function(err, cards) {
        if(err)
            res.send(err);
        var len = cards.length;
        var sum=0;
        for(var i=0; i<len-1; i++){
            sum+=cards[i].percentage;
        }
        var avepoint = sum/len;
        //console.log(avepoint);
        res.json(avepoint);
    });
});

function GenerateCards(arr){
    /////input arr has lenght of 52, output arr has length of 4 and each element is a array of 13
    var i;
    var cards = [];
    for(i=0; i<4; i++){
        var temp = arr.slice(i*13, i*13+13);
        cards.push(temp);        
    }
    return cards;
}

function shuffling(arr){
    //////input arr has lenght of 52, output arr has lenght of 52
    for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
    return arr;
}

function CalPercentage(arr){
    /////input arr has length of 4 and each element is a array of 13, output is the float number
    var points=0.0;
    var i, j;
    var a, b, temp;
    for(i=0; i<arr.length; i++){
        for(j=0; j<arr[i].length; j++){
            temp=arr[i][j].split(' ');
            a=temp[0];
            b=temp[1];
            if(j==0 && a=="A" || j==1 && a=="2" || j==2 && a=="3" || j==3 && a=="4" || j==4 && a=="5" || j==5 && a=="6" || j==6 && a=="7" || j==7 && a=="8" || j==8 && a=="9" || j==9 && a=="10" || j==10 && a=="J" || j==11 && a=="Q" || j==12 && a=="K")
                points++;
            if(i==0 && b=="S" || i==1 && b=="D" || i==2 && b=="H" || i==3 && b=="C")
                points++;
        }
    }    
    return points/104*100;
}

app.listen(3000);
console.log("i am alive");