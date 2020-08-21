var updateSchedule = function () {



  for (var i = 9; i <= 17; i++) {
    var activity = $("#" + i).find("#description");
    activity.removeClass("bg-light past present future");

    var time = moment().set("hour", i);

    if (moment().isAfter(time)) {
      activity.addClass("past");
    }
    else if (moment().diff(time, "hours") == 0) {
      activity.addClass("present");
    }

    else {

      activity.addClass("future");

    }

  }

  console.log("update");

  getToday();

}

function getToday() {

  var day = moment().format('dddd');
  var date = moment().format("MMMM Do YYYY");

  $("#currentDay").text(day + ", " + date);

}

function getAllActivities() {
  for (var i = 9; i <= 17; i++) {
    var descriptor = $("#" + i).find("#description");

    var activity = getScheduleActivity(i);

    descriptor.find("p").text(activity);
  }

}
function getScheduleActivity(time) {

  var activity = localStorage.getItem("scheduleActivity" + time);

  return activity;
}

function setScheduleActivity(time, activity) {
  localStorage.setItem("scheduleActivity" + time, activity);

}

function descriptionHandler() {

  console.log(this);
  var p = $(this).find('p');

  if (!p) return;



  var text = p.text();
  var textInput = $("<textarea>")
    .val(text);



  p.replaceWith(textInput);
  textInput.trigger("focus");


  textInput.keyup(areaLimitHandler);
}

function saveHandler() {

  textInput = $(this).parent().find("textarea");

  if (!textInput) return;

  var activity = textInput.val();

  var id = $(this).parent().attr("id");

  setScheduleActivity(id, activity);


  var p = $("<p>")
    .text(activity);



  textInput.replaceWith(p);


}

function areaLimitHandler() {

  if ($(this).val().length > 140) {


    var sub = $(this).val().substring(0, 140);
    $(this).val(sub);


  }
}

setInterval(updateSchedule, 10000);

updateSchedule();

getAllActivities();

$(".saveBtn").on('click', saveHandler);

$(".row").on('click', "#description", descriptionHandler);

