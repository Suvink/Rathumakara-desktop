
let featuredContent = document.getElementById("mediaCards");
//Load base UI Data
function getUI(){
    $.ajax({
        method: "GET",
        url: "https://raw.githubusercontent.com/Suvink/RathumakaraApi/master/rathumakaraApi.json",
        dataType: "json",
        cache: false,
        success: function (jsonReturn) { 
            //Latest Release
            $("#latest_release_song").html(jsonReturn.latest.song);
            $("#latest_release_day").html(jsonReturn.latest.date);
            $("#latest_release_url").attr('src',jsonReturn.latest.url);

            //Popular Programmes
            $("#popular_1_url").attr('src',jsonReturn.popular[0].url);
            $("#popular_1_song").html(jsonReturn.popular[0].song);
            $("#popular_1_artist").html(jsonReturn.popular[0].artist);
            
            $("#popular_2_url").attr('src',jsonReturn.popular[1].url);
            $("#popular_2_song").html(jsonReturn.popular[1].song);
            $("#popular_2_artist").html(jsonReturn.popular[1].artist);

            $("#popular_3_url").attr('src',jsonReturn.popular[2].url);
            $("#popular_3_song").html(jsonReturn.popular[2].song);
            $("#popular_3_artist").html(jsonReturn.popular[2].artist);

            //Related Programmes
            $("#related_1_url").attr('src',jsonReturn.related[0].url);
            $("#related_1_song").html(jsonReturn.related[0].song);

            $("#related_2_url").attr('src',jsonReturn.related[1].url);
            $("#related_2_song").html(jsonReturn.related[1].song);

            $("#related_3_url").attr('src',jsonReturn.related[2].url);
            $("#related_3_song").html(jsonReturn.related[2].song);

            //programmes
            //Loop eka danna ona
            $("#programmes_1").html(jsonReturn.programmes[0]);
            $("#programmes_2").html(jsonReturn.programmes[1]);
            $("#programmes_3").html(jsonReturn.programmes[2]);
            $("#programmes_4").html(jsonReturn.programmes[3]);
            $("#programmes_5").html(jsonReturn.programmes[4]);
            $("#programmes_6").html(jsonReturn.programmes[5]);
            $("#programmes_7").html(jsonReturn.programmes[6]);
            $("#programmes_8").html(jsonReturn.programmes[7]);
            $("#programmes_9").html(jsonReturn.programmes[8]);
            $("#programmes_10").html(jsonReturn.programmes[9]);
            $("#programmes_11").html(jsonReturn.programmes[10]);
            $("#programmes_12").html(jsonReturn.programmes[11]);
            $("#programmes_13").html(jsonReturn.programmes[12]);
            $("#programmes_14").html(jsonReturn.programmes[13]);
            $("#programmes_15").html(jsonReturn.programmes[14]);
            $("#programmes_16").html(jsonReturn.programmes[15]);
            $("#programmes_17").html(jsonReturn.programmes[16]);
            $("#programmes_18").html(jsonReturn.programmes[17]);
            $("#programmes_19").html(jsonReturn.programmes[18]);
            $("#programmes_20").html(jsonReturn.programmes[19]);
            $("#programmes_21").html(jsonReturn.programmes[20]);
            $("#programmes_22").html(jsonReturn.programmes[21]);
            $("#programmes_23").html(jsonReturn.programmes[22]);
            $("#programmes_24").html(jsonReturn.programmes[23]);
            $("#programmes_25").html(jsonReturn.programmes[24]);
            $("#programmes_26").html(jsonReturn.programmes[25]);
            $("#programmes_27").html(jsonReturn.programmes[26]);
            $("#programmes_28").html(jsonReturn.programmes[27]);
            $("#programmes_29").html(jsonReturn.programmes[28]);
            $("#programmes_30").html(jsonReturn.programmes[29]);
            $("#programmes_31").html(jsonReturn.programmes[30]);
            $("#programmes_32").html(jsonReturn.programmes[31]);
            console.log(jsonReturn.featured.length);

            for (let i = 0; i < jsonReturn.featured.length; ++i) {
                fe_inner_html = '<div class="media-card"><div class="media-card__image"style="background-image: url('+jsonReturn.featured[i].url+');"><i class="ion-ios-play"></i></div><a class="media-card__footer">'+jsonReturn.featured[i].radio+'</a><div style="display:none">'+jsonReturn.featured[i].play+'</div></div>';
                featuredContent.innerHTML = featuredContent.innerHTML + fe_inner_html;
            }
            
        },
        error: function error() {
            console.log(error);
        }
    });
}


//Audio Player
const audio = new Audio('http://radio.rathumakara.com:8000/rathumakara.mp3');
audio.canPlayType = "audio/mp3";
//const audio = new Audio('http://awscdn.podcasts.com/Adara-Ahasa-EP.01-RathuMakara-FM-f97d.mp3');
function playAudio() {
    let audioState = document.getElementById('pButton');

    if ($("#kk").html() == "play") {
        audioState.removeAttribute('class');
        audioState.setAttribute('class', 'ion-ios-pause');
        audio.currentTime = 10;
        audio.play();
        $("#kk").html("pause");
        var notification = new Notification("Please Wait!", {body: "Please Wait..."});
        setTimeout(function() {notification.close()}, 5000);
    } else if ($("#kk").html() == "pause") {
        audioState.removeAttribute('class');
        audioState.setAttribute('class', 'ion-ios-play');
        audio.pause();
        $("#kk").html("play");
    }
}


// Tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// Viewport Heights
$(window).on("resize load", function () {
    var totalHeight = $(window).height();
    var headerHeight = $('.header').outerHeight();
    var footerHeight = $('.current-track').outerHeight();
    var playlistHeight = $('.playlist').outerHeight();
    var nowPlaying = $('.playing').outerHeight();

    var navHeight = totalHeight - (headerHeight + footerHeight + playlistHeight + nowPlaying);
    var artistHeight = totalHeight - (headerHeight + footerHeight);
    $(".navigation").css("height", navHeight);
    $(".artist").css("height", artistHeight);
    $(".social").css("height", artistHeight);
});

// Collapse Toggles
$(".navigation__list__header").on("click", function () {
    $(this).toggleClass("active");
});

// Media Queries
$(window).on("resize load", function () {
    if ($(window).width() <= 768) {
        $(".collapse").removeClass("in");
        $(".navigation").css("height", "auto");
        $(".artist").css("height", "auto");
    }
});

$(window).on("resize load", function () {
    if ($(window).width() > 768) {
        $(".collapse").addClass("in");
    }
});

//Refresh data => Ajax async
setInterval(function info() {

    //Programme Title
    $.ajax({
        method: "GET",
        url: "http://radio.rathumakara.com:8000/status-json.xsl",
        dataType: "json",
        cache: false,
        success: function (jsonReturn_ic) {
            $("#onAir").html("Now On Air : "+(jsonReturn_ic.icestats.source.title).substring(0, 20));
        },
        error: function error() {
            console.log(error);
        }
    });


    //Main data stream
    $.ajax({
        method: "GET",
        url: "https://api.iconicto.com/rathumakara/player_status/",
        dataType: "json",
        cache: false,
        success: function (jsonReturn) {

            if (jsonReturn.now_playing.song === null) {

                if ($("#npthumb").attr("src") !== default_thumb)
                    $("#npthumb").attr("src", default_thumb);

                if ($("#npreq").text() !== "")
                    $("#npreq").text("");

                $("#npprogress").attr("style", "width: 100%");
                $("#duration").html("00:00");
                $("#tot_duration").html("00:00");
            }
            else {
                if ($("#npName").text() !== jsonReturn.now_playing.song){
                    $("#npName").text(jsonReturn.now_playing.song.substring(0, 20));
                    $("#songNameLy").text(jsonReturn.now_playing.song);
                    $("#search_name").text(jsonReturn.now_playing.song);
                }

                if ($("#npArtist").text() !== jsonReturn.now_playing.uploader){
                    $("#npArtist").text((jsonReturn.now_playing.uploader).substring(0, 17));
                    $("#search_artist").text(jsonReturn.now_playing.uploader);
                }

                if ($("#npthumb").attr("src") !== jsonReturn.now_playing.thumbnail)
                    $("#npthumb").attr("src", jsonReturn.now_playing.thumbnail);

                if ($("#npreq").text() !== jsonReturn.now_playing.requester)
                    $("#npreq").text("Requested By: " + jsonReturn.now_playing.requester);

                //fetch progress
                const progresspc = ((jsonReturn.now_playing.progress / jsonReturn.now_playing.duration) * 100);
                $("#npprogress").attr("style", "left:" + progresspc + "%");

                //Fetch duration
                let tot_durmin = Math.floor(jsonReturn.now_playing.duration / 60);
                const tot_dursec = jsonReturn.now_playing.duration % 60;

                let np_durmin = Math.floor(jsonReturn.now_playing.progress / 60);
                const np_dursec = jsonReturn.now_playing.progress % 60;

                let np_hr = 0;
                let tot_hr = 0;

                if (np_durmin > 60) {
                    np_hr = Math.floor(np_durmin / 60);
                    np_durmin = np_durmin % 60;
                }

                if (tot_durmin > 60) {
                    tot_hr = Math.floor(tot_durmin / 60);
                    tot_durmin = tot_durmin % 60;
                }
                //Post duration to html
                if (np_hr === 0 && tot_hr > 0) {
                    $("#duration").html(("0" + np_durmin).slice(-2) + ":" + ("0" + np_dursec).slice(-2));
                    $("#tot_duration").html(tot_hr + ":" + ("0" + tot_durmin).slice(-2) + ":" + ("0" + tot_dursec).slice(-2));
                }
                else if (np_hr === 0 && tot_hr === 0) {
                    $("#duration").html(("0" + np_durmin).slice(-2) + ":" + ("0" + np_dursec).slice(-2));
                    $("#tot_duration").html(("0" + tot_durmin).slice(-2) + ":" + ("0" + tot_dursec).slice(-2));
                }
                else {
                    $("#duration").html(np_hr + ":" + ("0" + np_durmin).slice(-2) + ":" + ("0" + np_dursec).slice(-2));
                    $("#tot_duration").html(tot_hr + ":" + ("0" + tot_durmin).slice(-2) + ":" + ("0" + tot_dursec).slice(-2));
                }
            }

            const ul = document.getElementById("queuecontent");
            const items = ul.getElementsByTagName("li");
            //console.log(jsonReturn.);

            if (items.length > jsonReturn.queue.length) {
                for (let i = jsonReturn.queue.length; i < items.length; ++i) {
                    ul.removeChild(items[i])
                }
            }
            //Fetch Queue Duration
           let song_dur
            for (let i = 0; i < items.length; ++i) {
                const song_number = i + 1;

                let song_durmin = Math.floor(jsonReturn.queue[i].duration / 60);
                const song_dursec = jsonReturn.queue[i].duration % 60;
                let song_hr = 0;

                if (song_durmin > 60) {
                    song_hr = Math.floor(tot_durmin / 60);
                    song_durmin = tot_durmin % 60;
                }
                let song_dur = song_hr + ":" + ("0" + song_durmin).slice(-2) + ":" + ("0" + song_dursec).slice(-2);

                const new_innerHTML = ' <div class="track"><div class="track__number">'+song_number+'</div><div class="track__added"><i class="ion-checkmark-round added"></i></div><div class="track__title">' + jsonReturn.queue[i].song + '</div><div class="track__explicit"><span class="label">Song</span></div><div class="track__length">'+song_dur+'</div><div class="track__popularity"><i class="ion-arrow-graph-up-right"></i></div></div></div>';
                if (items[i].innerHTML != new_innerHTML) {
                    items[i].innerHTML = new_innerHTML;
                } 
            }
            
            for (let i = items.length; i < jsonReturn.queue.length; i++) {
                const li = document.createElement("li");
                const song_number = i + 1;
                li.innerHTML = ' <div class="track"><div class="track__number">'+song_number+'</div><div class="track__added"><i class="ion-checkmark-round added"></i></div><div class="track__title">' + jsonReturn.queue[i].song + '</div><div class="track__explicit"><span class="label">Song</span></div><div class="track__length">'+song_dur+'</div><div class="track__popularity"><i class="ion-arrow-graph-up-right"></i></div></div></div>';
                //li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center customli");
                ul.appendChild(li);
            }
        },
        error: function error() {
            console.log(error);
        }
    });
}, 700);

//Get Lyrics
function getLyrics() {
    const api_key = "XsD3lhuouUX0x7wV5gzP14N277bqqQw2JKeqBhyaN1wI5P7flBbJdLQKMY0ocPN9";
    let song_name = document.getElementById("search_name").innerHTML;
    let song_artist = document.getElementById("search_artist").innerHTML;
    //let lyricsBlock = document.getElementById("songLyrics");
    let api_request = "https://orion.apiseeds.com/api/music/lyric/"+song_artist+"/"+song_name+"?apikey="+api_key;
    console.log(api_request);
    $.ajax({
        method: "GET",
        url: api_request,
        dataType: "json",
        cache: false,
        success: function (jsonReturn) { 
            console.log(jsonReturn.result.track.text);
            let lyrics = (jsonReturn.result.track.text);
            $("#songLyrics").text(lyrics);

            //Hadanna ona
            if(jsonReturn.error == null) {
                //lyricsBlock.text= jsonReturn.result.track;
            }
            else{
                console.log(jsonReturn.error);
            }
        },
        error: function error() {
        console.log(error);
}
    });
    
}
