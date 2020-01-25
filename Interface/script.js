var questions = [
    "If one of us apologizes when our discussion deteriorates, the discussion ends.",
    "I know we can ignore our differences, even if things get hard sometimes.",
    "When we need it, we can take our discussions with my spouse from the beginning and correct it.",
    "When I discuss with my spouse, to contact him will eventually work.",
    "The time I spent with my wife is special for us.",
    "We don't have time at home as partners.",
    "We are like two strangers who share the same environment at home rather than family.",
    "I enjoy our holidays with my wife.",
    "I enjoy traveling with my wife.",
    "Most of our goals are common to my spouse.",
    "I think that one day in the future, when I look back, I see that my spouse and I have been in harmony with each other.",
    "My spouse and I have similar values in terms of personal freedom.",
    "My spouse and I have similar sense of entertainment.",
    "Most of our goals for people (children, friends, etc.) are the same.",
    "Our dreams with my spouse are similar and harmonious.",
    "We're compatible with my spouse about what love should be.",
    "We share the same views about being happy in our life with my spouse",
    "My spouse and I have similar ideas about how marriage should be",
    "My spouse and I have similar ideas about how roles should be in marriage",
    "My spouse and I have similar values in trust.",
    "I know exactly what my wife likes.",
    "I know how my spouse wants to be taken care of when she/he sick.",
    "I know my spouse's favorite food.",
    "I can tell you what kind of stress my spouse is facing in her/his life.",
    "I have knowledge of my spouse's inner world.",
    "I know my spouse's basic anxieties.",
    "I know what my spouse's current sources of stress are.",
    "I know my spouse's hopes and wishes.",
    "I know my spouse very well.",
    "I know my spouse's friends and their social relationships.",
    "I feel aggressive when I argue with my spouse.",
    "When discussing with my spouse, I usually use expressions such as ‘you always’ or ‘you never’ .",
    "I can use negative statements about my spouse's personality during our discussions.",
    "I can use offensive expressions during our discussions.",
    "I can insult my spouse during our discussions.",
    "I can be humiliating when we discussions.",
    "My discussion with my spouse is not calm.",
    "I hate my spouse's way of open a subject.",
    "Our discussions often occur suddenly.",
    "We're just starting a discussion before I know what's going on.",
    "When I talk to my spouse about something, my calm suddenly breaks.",
    "When I argue with my spouse, ı only go out and I don't say a word.",
    "I mostly stay silent to calm the environment a little bit.",
    "Sometimes I think it's good for me to leave home for a while.",
    "I'd rather stay silent than discuss with my spouse.",
    "Even if I'm right in the discussion, I stay silent to hurt my spouse.",
    "When I discuss with my spouse, I stay silent because I am afraid of not being able to control my anger.",
    "I feel right in our discussions.",
    "I have nothing to do with what I've been accused of.",
    "I'm not actually the one who's guilty about what I'm accused of.",
    "I'm not the one who's wrong about problems at home.",
    "I wouldn't hesitate to tell my spouse about her/his inadequacy.",
    "When I discuss, I remind my spouse of her/his inadequacy.",
    "I'm not afraid to tell my spouse about her/his incompetence."
];

var weights = [-1.344283752865634, 0.26603687674967985, 0.6375452870967105, 0.29954414166129173, 0.6091132619850286, 0.31519554446255355, 0.4681920997892726, 0.9887908340225812, 0.12935142630054056, 0.6617488377152698, -0.7660100551506364, 0.7181005733547121, -0.20164887072017096, -0.8573050754883409, 0.9335927299386427, 0.16383983062336094, 0.7335956208486364, 0.16733307492196167, 0.8990580196022411, 0.930495809256954, 1.5608447578260118, 0.47858210272047563, 0.44415868545506665, 0.7985411533331486, 0.020435270395491725, 0.08413130046125972, 1.146656530960199, 0.26587452354791874,
    1.290715056764723, 1.0390993371152981, 1.280786433305605, -0.1308797048608689, -0.2709183263851333, 0.6836368129555483, 0.1326422375395999, 0.7331446234283507, 1.414663725956523, 0.013607327380696279, 0.5410530283581678, 1.1927954723461667, 2.142868541662465, 0.44502534747326417, 0.17344762737284655, -1.6386053856218072, 1.2012665613297984, -0.9663207939422072, -0.9702092930071443, -0.7724960546062211, -2.1784295568932697, 0.49802961991572825, -0.47210326713333256, -1.9115555256565178, 0.42610876709399786, -0.41110820743292426, -0.7436091540764912
];

$cards = $("#cards");
var cards_html = "";

questions.forEach(function(question, num) {
    cards_html += "<div class='card'><div class='question'>" + question + "</div>" +
        "<input type='radio' name='" + num + "' value='0' id='" + num + "-" + "0'><label for='" + num + "-" + "0'>Strongly Disagree</label>" +
        "<input type='radio' name='" + num + "' value='1' id='" + num + "-" + "1'><label for='" + num + "-" + "1'>Disagree</label>" +
        "<input type='radio' name='" + num + "' value='2' id='" + num + "-" + "2'><label for='" + num + "-" + "2'>Neutral</label>" +
        "<input type='radio' name='" + num + "' value='3' id='" + num + "-" + "3'><label for='" + num + "-" + "3'>Agree</label>" +
        "<input type='radio' name='" + num + "' value='4' id='" + num + "-" + "4'><label for='" + num + "-" + "4'>Strongly Agree</label>" +
        "</div></div>";
});

$cards.html(cards_html);

$submit = $("#submit").click(function() {
    var results = []
    for (var i = 0; i < questions.length; i++) {
        var result = $('input[name=' + i + ']:checked', '#card-form').val();
        if (result != undefined) {
            results.push(result * 1.0);
        } else {
            break;

        }
    }
    if (results.length == questions.length) {
        $("#stage-1").css("display", "none");
        $("#stage-2").css("display", "block");
        var sum = 0;
        for (var i = 0; i < questions.length; i++) {
            sum += results[i] * weights[i + 1];
        }
        sum += weights[0];
        console.log(sum);
        console.log(sigmoid(sum));
        var chance = Math.round(sigmoid(sum) * 100);
        $("#divorce").html(chance + "%");
        var css = "<style>#result:before{transform: translate(-6em, .5em) rotate(-15deg)}#result:after{transform: translate(6em, .5em) rotate(15deg)}</style>";
        setTimeout(function() {
            $(".sub-2").css("animation", "fade-in-out 1.5s");
        }, 100);
        setTimeout(function() {
            $(".sub-2").css("display", "none");
            $("#result").css("display", "block");
        }, 2000);
        setTimeout(function() {
            $("#result").css("opacity", "1");
            $(css).appendTo("head");
        }, 2100);
    } else {
        alert("Please answer all of the questions first.");
    }
});

function sigmoid(num) {
    return 1 / (1 + Math.exp(-num));
}