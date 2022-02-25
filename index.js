const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require('lodash');
//const date = require(__dirname + "/date.js");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine' , 'ejs');

 //var works = ["Buy groceries", "Cook food", "Eat"];
 //var works10 = [];

 const username = "chalkeneel15";
 const password = "eLUNr2leTJ5OBuAM";
 const cluster = "<cluster0>";
 const dbname = "toDoListDB";

 mongoose.connect(
   `mongodb+srv://chalkeneel15:eLUNr2leTJ5OBuAM@cluster0.ks8su.mongodb.net/toDoListDB?retryWrites=true&w=majority`
 );

const itemSchema = new mongoose.Schema({
  name: String
})



const Item = mongoose.model('Item', itemSchema);

const item_one = new Item ({
  name : 'Neel'
})

const item_two = new Item ({
  name: 'Reet'
})

const item_three = new Item ({
  name: 'Mangesh'
})

const defaultItems = [item_one, item_two, item_three];

const listSchema = new mongoose.Schema({
  name: String,
  items : [itemSchema]
})

const List = new mongoose.model("List", listSchema);


//Item.find(function(err, items) {
  //if (err) {
    //console.log(err);
  //} else {
    //for (var b = 0; b < items.length; b++) {
      //console.log(items[b].name);
    //}
  //}
//})

app.get("/" , function (req,res) {

//var day10  = date.getDate();
Item.find(function(err , items) {
if (items.length === 0 ) {
  Item.insertMany(defaultItems, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('data has been inserted');
    }
  })
  res.redirect("/");
} else {
  Item.find(function(err, items) {
    if (err) {
      console.log(err);
    } else {
      //console.log(items);
      res.render('list' , {message10 : 'Today', stuffToDo : items});
    }
  })
}
 })




});

app.post("/" , function(req,res) {
var work = req.body.stuff;
var listTitle = req.body.list;

const item_work = new Item ({
  name : work
})

if (listTitle === 'Today') {
  item_work.save();
  res.redirect("/");
} else {
  List.findOne({name : listTitle} , function (err, foundList) {
    foundList.items.push(item_work);
    foundList.save();
    res.redirect("/" + listTitle);
  })
}


//if (req.body.list === "Work") {
  //works10.push(work);
  //res.redirect("/work");
//} else {
  //works.push(work);
  //res.redirect("/");
//}

})



app.post("/delete" , function(req,res) {
  var d = req.body.checkbox;
  var listName10 = req.body.listName;

  if (listName10 === 'Today') {
    Item.findByIdAndRemove(d, function(err) {
      if (!err) {
        console.log("successfully deleted checked item");
        res.redirect("/");
      }
    })
  } else {
    List.findOneAndUpdate({named: listName10}, {$pull : {items: {_id : d}}}, function(err, foundList) {
      if (!err) {
        res.redirect("/" + listName10);
      }
    })
  }
  //Item.deleteOne({_id : d} , function(err) {
    //if (err) {
      //console.log(err);
    //} else {
      //console.log('data has been deleted successfully');
    //}
  //});
  //console.log(d);
  //res.redirect("/");
})

app.get("/:name" , function(req,res) {
  var customTitle = _.lowerCase(req.params.name);

  List.findOne({name: customTitle} , function (err, listItems) {
    if (!err) {
      if (!listItems) {
        const listItem = new List ({
          name: customTitle,
          items: defaultItems
        });
        listItem.save();
        res.redirect("/" + customTitle);
      } else {
        var listName = listItems.name;
        var listItems10 = listItems.items;
        res.render('list' , {message10 : listName, stuffToDo : listItems10});
      }
    }
  })

})

app.listen(3000, function () {
  console.log("Server is running on port 3000");
})
