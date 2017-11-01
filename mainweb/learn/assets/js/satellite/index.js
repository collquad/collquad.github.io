$(".hamburger").click(function() {
  $(this).toggleClass("hamburger--slider is-active");

  $(".mobile-navigation").toggle();
  $("body").toggleClass("overlay-open");
});

$(".launch-video-overlay").click(function() {
  $("body").addClass("overlay-open");

  $("#overlay-satellite-2016").css('display', 'flex');
});

$(".speaker-card").hover(function() {
  rollover = $(this).attr("id");
  $("#" + rollover + " .speaker-card-rollover").fadeToggle(100);
});

$(".speaker-card").click(function() {
  var speakerID = $(this).attr('id');

  $("body").addClass("overlay-open");

  window.location.hash = speakerID;

  $('[id^="overlay"]').css('display', 'none');
  $("#overlay-" + speakerID).css('display', 'flex');
});

$(".talk").click(function() {
  var talkID = $(this).attr('id');

  $("body").addClass("overlay-open");

  window.location.hash = talkID;

  $('[id^="overlay"]').css('display', 'none');
  $("#overlay-" + talkID).css('display', 'flex');
});

$(".close").click(function(e) {
  e.stopPropagation(); // stops the bubbling from above

  $("body").removeClass("overlay-open");

  window.location.hash = '';

  $('[id^="overlay"]').css('display', 'none');
});

var hash = window.location.hash;
hash = hash.replace('#','');

if(window.location.hash) {
  $("#overlay-" + hash).css('display', 'flex');
}
