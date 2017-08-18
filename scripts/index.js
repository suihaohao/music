$(function() {
	var musics=[];
	$.get('./databas.json').done(function(data){
		musics=data;
		render();
		// console.table(musics)
	})
	var audio = $('audio').get(0);
	var percent;
	var yuansheng;
	var songs=0;
	var currentT;
	function render(){
		$('#spansongnum1 span:eq(0)').text(musics.length);
		$.each(musics,function(i,v){
			$('<li index="1" class="li"><strong class="music_name" title="">'+v.title+'</strong>  <strong class="singer_name" title="">'+v.artist+'</strong> <strong class="play_time">'+v.duration+'</strong>  <div class="list_cp">  <strong class="btn_like" title="喜欢" name="" mid="">   <span>我喜欢</span>	</strong>	<strong class="btn_share" title="分享"> <span>分享</span> </strong>  <strong class="btn_fav" title="收藏到歌单"> <span>收藏</span> </strong>  <strong class="btn_del" title="从列表中删除"> <span>删除</span> </strong>   </div> </li>').appendTo($('#cc'));
		})
	}
	render();
	var starOrstop=function(){
		if(audio.paused) {
			$('#btnplay').addClass('pause_bt').removeClass('play_bt');
			audio.play();
		}else{
			$('#btnplay').addClass('play_bt').removeClass('pause_bt');
			audio.pause();
		}
	}
	var bofang = function() {
		yuansheng = audio.volume;
		audio.src=musics[songs].filename;
		$('#cc li').removeClass('play_current')
		$('#cc li:eq('+songs+')').addClass('play_current');
		$('#btnplay').addClass('pause_bt').removeClass('play_bt');
		$('#music_name').text(musics[songs].title)
		$('#singer_name').text(musics[songs].artist)	
		$('#ptime').text(musics[songs].duration)
		audio.play();
		$('#musicop').css({display:'block'})
	}

	$('#btnplay').on('click',starOrstop)
	$('#spanvolume').on('click', function(e) {
		audio.volume = e.offsetX / $(this).width();
		yuansheng = audio.volume;
		spanvolume();
	})
	$('#spanmute').on('click', function() {
		if (audio.volume !== 0) {
			audio.volume = 0;
		} else {
			audio.volume = yuansheng;
		}
		spanmute();
	})
	audio.ontimeupdate=function() {
		var jindu = (audio.currentTime / audio.duration * 100).toFixed(2) + '%';
		$('.progress_op').css({left: jindu});
		$('#downloadbar').css({width: jindu});
	}
	var spanmute = function() {
		if (audio.volume === 0) {
			$('#spanmute').addClass('volume_mute').removeClass('volume_icon');
		} else {
			$('#spanmute').addClass('volume_icon').removeClass('volume_mute');
		}
		spanvolume();
	}
	var spanvolume = function() {
		percent = (audio.volume * 100).toFixed(2) + '%';
		$('#spanvolumebar').width(percent);
		$('#spanvolumeop').css({left: percent});
	}
	$('#cc').on('click','li',function(){
		var index=$(this).index();
		songs=index;
		bofang();
	})
	var shunxuxunhuan=function(){
		songs=songs+1;
		if (songs>musics.length-1) {
			songs=0;
		}
		bofang();
	}
	$('#nextbt').on('click',function(){
		shunxuxunhuan();
	})
	$('#prevbt').on('click',function(){
		songs=songs-1;
		if (songs < 0) {
			songs=musics.length-1;
		}
		bofang();
	})
	audio.onended=function(){
		shunxuxunhuan();
	};
	$('.player_bar').on('click',function(e){
		currentT=(e.offsetX / $(this).width()*100).toFixed(2);
		$('.progress_op').css({left: currentT+'%'});
		$('#downloadbar').css({width: currentT+'%'});
		audio.currentTime=currentT/100*audio.duration;
	})
	var toumingdu=1;
	$('#spansongnum1').on('click',function(){
		if (toumingdu===1) {
			toumingdu=0;
		}else{
			toumingdu=1;
		}
		$('#divplayframe').animate({opacity:toumingdu},400)
	})
	$('#cc').on('mouseenter mouseleave','li',function(){
		$(this).toggleClass('play_hover').toggleClass('li');
	})
	$('#cc').on('click','.btn_del',function(){
		$(this).closest('li').remove();
	})
})
