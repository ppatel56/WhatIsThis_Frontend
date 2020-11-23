import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';

import firebase, {firestore} from 'firebase';
import {firebaseConfig} from '../config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Original today data variable -> UTC -> EST (Philly)
const today = new Date().toISOString().split('T')[0];

const todaysDate = new Date();
const UTCOffset =  todaysDate.getTimezoneOffset();
const dateToday = todaysDate;
const USA_EST_Offset = 5*60; //UTCOffset = 300

//dateToday.setMinutes(dateToday.getMinutes() - USA_EST_Offset);
todaysDate.setMinutes(todaysDate.getMinutes() - USA_EST_Offset);

// Convert long date format (Sat Nov 14 2020...) to ISO date format (2020-11-14...)
//const todayEST = new Date(dateToday).toISOString().split('T')[0]; 
const todayEST = new Date(todaysDate).toISOString().split('T')[0];

console.log("Today in UTC: " + today);
console.log("UTC Offset: " + UTCOffset);
console.log("Today in EST: " + todayEST + "\n\n");


const pastDate = getPastDate(3);
//console.log(pastDate)
const futureDates = getFutureDates(9);
const dates = [pastDate, todayEST].concat(futureDates);
//console.log(dates)

const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';


function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

// Pass in the date, something like 11/24/2020 or whatever format that works
// then return the index number for that day for the date array.
/*function countDates(days){
  
  return indexDay;
}*/

/**
 * The ITEMS array holds the events
*/
// Array -> Map(title, data->Array-> Map(name))

const ITEMS = [
  {title: dates[0], data: [{name: 'Bench Press'}]},
  {title: dates[1], data: [{name: 'Bent Over Row'}, {name: 'Bicep Curl with Dumbbells'}]},
  {title: dates[1], data: [{name: 'Cycling'}, {name: 'Deadlift'}]},
  {title: dates[2], data: [{name: 'Bicep Curls with Barbell'}, {name: 'Chin Ups'}, {name: 'Crunches'}]},
  {title: dates[3], data: [{name: 'Cycling'}]},
  {title: dates[4], data: [{name: "Deadlift"}]},
  {title: dates[5], data: [{name: 'Dips Between Two Benches'}, {name: 'Front Squats'}, {name: 'Jogging'}, {name: 'Kettlebell Clean & Press'}]},
  {title: dates[6], data: [{name: 'Lateral Raises'}]},
  //{title: dates[7], data: [{}]},
  {title: dates[7], data: [{name: 'Leg Press'}]},
  {title: dates[8], data: [{name: 'Leg Press(wide)'}, {name: 'Leg Raises, Lying'}, {name: 'Pull Ups'}, {name: 'Squats'}]},
  {title: dates[9], data: [{name: 'Bench Press'}, {name: 'Bent Over Row'}, {name: 'Chin Ups'}]},
  {title: dates[10], data: [{ name: 'Deadlift'}]}
];
//console.log("ITEMS ARRAY: " + ITEMS[2].title + ITEMS[2].data.forEach((element)=>{console.log(element.name);}));

// store date string such as 2020-11-20
const date = [];

// ITEMS =[{title: date[0], data: [{name: 'Bench Press'}, {name: 'Deadlift'}]}]
const items = [];

/* Adding 

Pressed "+" 
[]


*/

/*
const eventArrExercise = ITEMS.map(events => {
  events.title,
  events.data.map(itemEvent=> {itemEvent.name});
});
console.log(eventArrExercise);
*/
//const valuesOfITEMS = ITEMS.values();

//console.log(valuesOfITEMS.next().value.title);
//console.log("\n");
//console.log(valuesOfITEMS.next().value);
const valuesOfITEMS = ITEMS.values();

//console.log(valuesOfITEMS.next().value.title);
//console.log("\n");
//console.log(valuesOfITEMS.next().value);
//console.log("ITEMS values:\n");
//console.log(valuesOfITEMS.next());
//for(let valueITEMS of valuesOfITEMS){
//  console.log(valueITEMS);
//}
/*
const eventArrExercise = ITEMS.map(events => {
  //console.log(events.title),
  events.title,
  events.data.map(itemEvent=> {
    //console.log(itemEvent.name);
    itemEvent.name
  });
});*/

function parseArray(arrayOfMap){
  
  
  return parsedArray;
}



console.log("\n\n");
console.log();

let names = ITEMS.reduce((str, itemEvents) => `${str} ${itemEvents.name}`, '||');
//console.log(names);
/*
const authors = [ { id: 1, name: 'Steven'}, {id: 2, name: 'Nick'}]
let names = authors.map( (a, i) => `${a.name} is cool`).join(' ');
console.log(names);
*/

const workoutList = new Array();

function buildArray(eventsArray){
  ITEMS.forEach(itemEvent => {
    if(itemEvent.data[0].name.includes('First Yoga')){
        //muscleExerciseList.push(exercise.name, "\n\n",exercise.description, "\n\n\n");
        workoutList.push(itemEvent.data[0].name, "\n\n");
    }
  })
  //console.log(workoutList);
  return workoutList;
  //return console.log(workoutList);
}

buildArray(ITEMS);



//console.log(eventArrExercise);
function retrieveEventsFromUserDatabase(){

  return console.log("Retreive user information");
}





//This would have to be an array of an array of objects.
//Have an array of objects that the events get stored when creating them 
const exerciseArray = [
  ["Running", "Bench Press"], 
  ["Leg Press", "Deadlift"]
];

const dateArray = ["2020-11-29", "2020-12-01"];

//{title: dates[1], data: [{name: 'Bent Over Row'}, {name: 'Bicep Curl with Dumbbells'}]}
function addEventToArray(eventArray,date,exerciseArray) {
  for(var i = 0; i < date.length; i++){
    for(var j = 0; j < exerciseArray[i].length; j++){
      eventArray.push({title: date[i], data: [{name: exerciseArray[i][j]}]});
      
    }
  }
  return eventArray;
}

function printAddEventToArray(eventArray, date, exerciseArray){
  for(var i = 0; i < date.length; i++){
    for(var j = 0; j < exerciseArray[i].length; j++){
      eventArray.push({title: date[i], data: [{name: exerciseArray[i][j]}]});
      
    }
  }
  return console.log(eventArray);
}

printAddEventToArray(items, date, exerciseArray);


var removedResult;
const resultArray = [];
const arrayEvents = [
  {
    title: "2020-12-25", 
    data: [
      {
        name: 'Cycling'
      }, 
      {
        name: 'Deadlift'
      }
    ]
  }
  ];
/*
for(var i=0; i < arrayEvents.length; i++){
  console.log("Iteratation i = " + i);
  console.log(arrayEvents.length);
  console.log("Length of data: " + arrayEvents[i].data.length);
  //console.log("arrayEvents i = " + i + ":\n" + arrayEvents[i].data[1].name);
  const result = arrayEvents[i];
  console.log("result: " + arrayEvents[0].data[0].name);
  for(var j=0; j < arrayEvents[i].data.length; j++){
    //console.log(arrayEvents[i].data[j].name);
    if(arrayEvents[i].data[j].name === "Deadlift"){
      console.log("Iterate j");
      //resultArray = arrayEvents[i].data[j].name
      //arrayEvents.pop(arrayEvents[i].data[j].name);
      console.log("Name of exercise: " + arrayEvents[i].data[j].name);
      //console.log()
      //break;
    }
  }
}*/


//console.log(arrayEvents[0].data[]);
/*for(var i=0; i < arrayEvents.length; i++){
  arrayEvents.pop(arrayEvents[i].data);
  
}*/
console.log("Using values() function:");
const valueOfEvents = arrayEvents.values();
for(let eventValues of valueOfEvents){
  console.log(eventValues);
}
console.log("Using JSON stringify:");
const stringJSONEvents = JSON.stringify(arrayEvents); 
console.log("stringJSONEvents: " + stringJSONEvents);

console.log("\nStringify JSON, remove name object, then use values():");



var ar = [{"value":"14","label":"7"},{"value":"14","label":"7"},{"value":"18","label":"7"}];
console.log("ar length BEFORE splice: " + ar.length);
for(var i=0; i < ar.length; i++) {
   if(ar[i].value == "14" && ar[i].label == "7")
   {
      var arrayAR = ar.splice(i,1);
   }
}
console.log("\nar length AFTER splice: " + ar.length);
console.log("\nar: " + JSON.stringify(ar));
console.log("ar[1]: " + ar[1].value);
const valuesOfAr = ar.values();
for(let arValues of valuesOfAr){
  console.log(arValues);
}
const workoutEvents =[
  {
    title: "2020-11-30", 
    data: [
      {name: 'Bent Over Row'}, 
      {name: 'Bicep Curl with Dumbbells'}
    ]
  },
  {
    title: "2020-12-03",
    data: [
      {name: 'Running'},
      {name:'Cycling'}
    ]
  }
]; 
//Doing splice with events

/*const valuesOfWorkoutEvents = workoutEvents.values();
for(let workoutEventsValues of valuesOfWorkoutEvents){
  console.log(workoutEventsValues);
}*/

for(var i=0; i < workoutEvents.length; i++){
  //for(var j=0; j <workoutEvents[i].data.length; j++){
  console.log("i = " + i);
  console.log("workout event date: " + workoutEvents[i].title);
  for(var j=0; j < workoutEvents[i].data.length; j++){
    if(workoutEvents[i].title == '2020-12-03' && workoutEvents[i].data[j].name === 'Running'){
      console.log("Getting match date: " + workoutEvents[i].title);
      console.log("Getting match exercise: " + workoutEvents[i].data[j].name);
      workoutEvents[i].data.splice(j,1);
      console.log(JSON.stringify(workoutEvents));
    }
  }
  //}
}

//console.log("\n\nWorkout Events AFTER Splice:\n");
//const valuesOfWorkoutEvents = workoutEvents.values();
//for(let workoutEventsValues of valuesOfWorkoutEvents){
//  console.log(workoutEventsValues);
//}
//arr.splice(ar.findIndex(matchesEl), 1);

//function matchesEl(el) {
//    return el.value === '14' && el.label === '7';
//}
//removeByAttr(arr, 'id', 1);   
// [{id:2,name:'alfalfa'}, {id:3,name:'joe'}]

//removeByAttr(arr, 'name', 'joe');
// [{id:2,name:'alfalfa'}]


//console.log(arrayEvents.length);
//console.log("result array:");
//console.log(resultArray);
//console.log("ARRAY ARRAY ARRAY");





const dateString = "2020-12-01";
const exerciseName = "Deadlift";


// Iterate through the array of events and pop of the exercise e.g. {name: "Running"}
function removeEventFromArray(eventArray,dateString,exerciseName){
  /*for(var i = 0; i < eventArray.length; i++){
    for(var j = 0; j < eventArray[i].data.length; j++){
      if (eventArray[i].data[j].name === exerciseName) {
        console.log(eventArray[i].data[j].name);
        break;
      }
    }
  }
  
  return console.log(eventArray[i].data[j].name);*/
  for(var i=0; i < eventArray.length; i++){
    //for(var j=0; j <workoutEvents[i].data.length; j++){
    console.log("i = " + i);
    console.log("event array date: " + eventArray[i].title);
    for(var j=0; j < eventArray[i].data.length; j++){
      if(eventArray[i].title == dateString && eventArray[i].data[j].name === exerciseName){
        console.log("Getting match date: " + eventArray[i].title);
        console.log("Getting match exercise: " + eventArray[i].data[j].name);
        eventArray[i].data.splice(j,1);
        
      }
    }
    //}
  }
  console.log(JSON.stringify(eventArray));
  return eventArray;
}

//items = addEventToArray(items, dateArray, exerciseArray);

function addEventsToFirestore(eventsArray){
  //const user =  firebase.auth().currentUser;
  //const workoutEvents = [];
  //var index = 0;
  //for (index = 0; index < eventsArray.length; index++) { 
    //console.log(eventsArray[index]); 
    //console.log(eventsArray[index][0]);
  //}
  
// Checking the current user's ID. 
// The document names are user ID in the user database in FireStore. 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is signed in.\n");
      console.log("Current User ID: " + user.uid);
      firestore().collection('user').doc(user.uid).update({
        workoutEvents: firebase.firestore.FieldValue.arrayUnion("2020-11-15||Bench Press")});
    } else {
      // No user is signed in.
      console.log("No user is signed in.\n");
    }
  }); 
  
  return console.log("\n\n Added event to user's database \n\n");
}


function removeEventsFromFirestore(eventsArray) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is signed in.\n");
      console.log("Current User ID: " + user.uid);
      firestore().collection('user').doc(user.uid).update({
        workoutEvents: firebase.firestore.FieldValue.arrayRemove("2020-11-15||Leg Press")});
    } else {
      // No user is signed in.
      console.log("No user is signed in.\n");
    }
  }); 
  return console.log("\n\n Added event to user's database \n\n");
}


addEventsToFirestore(ITEMS);

removeEventsFromFirestore(ITEMS);




export default class ExpandableCalendarScreen extends Component {

  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  }

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  }

  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.name)}
        style={styles.item}
        /*ITEMS = [{title: date}, data:{name: "Running"}] */
      > 
    <Text style={styles.itemTitleText}>{item.name}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'} onPress={this.buttonPressed}/>
        </View>
      </TouchableOpacity>
    );
  }

  getMarkedDates = () => {
    const marked = {};
    items.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
        //console.log("\n\n" + item.title + "\n\n");
      } else {
        marked[item.title] = {disabled: true};
        //console.log("\n\n" + item.title + "\n\n");
      }
    });
    return marked;
  }
  
  items = addEventToArray(items, dateArray, exerciseArray); 
  items = removeEventFromArray(items, dateString, exerciseName);


  getTheme = () => {
    const disabledColor = 'grey';

    return {
      // arrows
      arrowColor: 'black',
      arrowStyle: {padding: 0},
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: 'white',
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: 'white',
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2}
    };
  }

  render() {
    return (
      <CalendarProvider
        date={items[0].title}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        // theme={{
        //   todayButtonTextColor: themeColor
        // }}
        // todayBottomMargin={16}
      >
        
        {this.props.weekView ?
          <WeekCalendar
            
            firstDay={1}
            markedDates={this.getMarkedDates()}
          /> :
          <ExpandableCalendar
            
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.calendar} // for horizontal only
            // disableWeekScroll
            // theme={this.getTheme()}
            disableAllTouchEventsForDisabledDays
            firstDay={1}
            markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
            //leftArrowImageSource={require('../img/previous.png')}
            //rightArrowImageSource={require('../img/next.png')}
          />
        }
        <AgendaList
          sections={items}
          extraData={this.state}
          renderItem={this.renderItem}
          // sectionStyle={styles.section}
        />
        <TouchableOpacity
          onPress={() =>
            /*navigation.navigate('CreateTask', {
            updateCurrentTask: this._updateCurrentTask,
            currentDate,
            createNewCalendar: this._createNewCalendar,
            })*/
            Alert.alert('Adding events button')
          }
          style={styles.viewTask}
        >
          <Image
            source={require('../assets/plus.png')}
            style={{
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize'
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    //backgroundColor: '#2E66E7',
    backgroundColor: '#00acee',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    //shadowColor: '#2E66E7',
    shadowColor: '#00acee',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  }
});