const app = () =>{

    const song=document.querySelector('.song');
    const play =document.querySelector('.play');
    const outline=document.querySelector('.moving-outline circle');
    const video =document.querySelector('.vid-container video')
    //select all sounds
    const sounds=document.querySelectorAll('.sound-picker button')
    //select time display
    const timedisplay=document.querySelector('.time-display')
    const timeselect=document.querySelectorAll('.time-select button');
    //selct outline video image circle length
    const outlineLength=outline.getTotalLength();
   
    //duriation
    let fakeduriation=600;
    outline.style.strokeDasharray=outlineLength;
    outline.style.strokeDashoffset=outlineLength;
    sounds.forEach(sound =>{
        sound.addEventListener('click',function(){
        song.src=this.getAttribute('data-sound');
        video.src=this.getAttribute('data-video');
        checkPlaying(song);
        });
    })
    //paly sounds
    play.addEventListener('click',()=>{
        checkPlaying(song);
    });

    timeselect.forEach(option =>{
        option.addEventListener('click' , function(){
            fakeduriation=this.getAttribute('data-time');
            timedisplay.textContent=`${Math.floor(fakeduriation / 60)} : ${Math.floor(fakeduriation % 60)}`;
        });
    });

    const checkPlaying =song=>{
        if(song.paused){
            song.play();
            video.play();
            play.src='./svg/pause.svg';
        }
        else{
            song.pause();
            video.pause();
            play.src='./svg/play.svg';
        }
    };

    //wecan animat the circle
    song.ontimeupdate = ()=>{
        let currentTime=song.currentTime;
        let elapsed =fakeduriation-currentTime;
        let seconds=Math.floor(elapsed % 60);
        let minutes=Math.floor(elapsed / 60);

        //animate the circle
        let progress= outlineLength - (currentTime / fakeduriation) *outlineLength;
        outline.style.strokeDashoffset =progress;
        //animate timer
        timedisplay.textContent=`${minutes} : ${seconds}`;
        
        if(currentTime>=fakeduriation){
            song.pause();
            song.currentTime=0;
            play.src='./svg/play.svg';
            video.pause();
        }
    };
}

app();