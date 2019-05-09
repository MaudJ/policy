function collision($div1, $div2) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

function collision_transition($div1, $div2){
    if(collision($div1, $div2)){
        $div2.removeClass("is-active")
    } else{
        $div2.addClass("is-active")
    }
}

window.setInterval(function() {

    collision_transition($('#flight_0'), $('#flight_1'))
    collision_transition($('#sd_chart_0'), $('#sd_chart_2'))
    collision_transition($('#sd_chart_0'), $('#sd_chart_1'))
    collision_transition($('#sd_chart_4'), $('#sd_chart_3'))

    collision_transition($('#airport_divert_0'), $('#airport_divert_1'))
    collision_transition($('#airport_divert_0'), $('#airport_divert_2'))
    collision_transition($('#airport_divert_2'), $('#airport_divert_3'))
    collision_transition($('#airport_divert_4'), $('#airport_divert_5'))

    collision_transition($('#pass_seat_0'), $('#pass_seat_1'))
    collision_transition($('#pass_seat_0'), $('#pass_seat_2'))

    collision_transition($('#profit_0'), $('#profit_1'))
    collision_transition($('#profit_0'), $('#profit_2'))

}, 200);

$(document).ready(function() {



    $('#section1').click(function() {
        $('html, body').animate({
            scrollTop: ($('#section1_start').first().offset().top)
        }, 500);
    })

    $('#section2').click(function() {
        $('html, body').animate({
            scrollTop: ($('#section2_start').first().offset().top)
        }, 500);
    })

    $('#section3').click(function() {
        $('html, body').animate({
            scrollTop: ($('#section3_start').first().offset().top)
        }, 500);
    })

    $('#to_head').click(function() {
        $('html, body').animate({
            scrollTop: ($('#top').first().offset().top)
        }, 500);
    })

})
