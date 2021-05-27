import Image from 'next/image';
import { useContext, useRef, useEffect, useState } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';



export default function Player(){  
  const {
    episodeList, 
    currentEpisodeIndex,
    isPlaying ,
    isShuffling,
    toggleShuffle,
    isLooping,
    toggleLoop, 
    togglePlay, 
    setIsPlayingState,
    playPrevious,
    playNext, 
    hasNext,
    clearPlayerState, 
    hasPrevious } = useContext(PlayerContext)

  const [progress, setProgress] = useState(0);
  function setupProgressListener(){
    audioRef.current.currentTime = 0 
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number){
    audioRef.current.currentTime = amount
    setProgress(amount)
  }


  function handleEpisodeEnded(){
    if(hasNext){
      playNext()
    }else{
      clearPlayerState()
    }
  }
  


  const episode = episodeList[currentEpisodeIndex]



  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {

    if(!audioRef.current){
      return;

    }
    if(isPlaying){
      audioRef.current.play()
    }else{
      audioRef.current.pause()
    }

  }, [isPlaying])


  return(
    

    <div className={styles.playerContainer}>
      <header>
        <img src='/playing.svg' alt='Tocando agora' />
        <strong>Tocando Agora {episode?.title}</strong>
      </header>

      { !episode ? (
          <div className={styles.emptyPlayer}>
            <strong >Selecione um podcast para ouvir</strong>
          </div>
      ) : (
        <div className={styles.currentEpisode}>
          <Image width={592} height={592} src={episode.thumbnail} objectFit='cover'/>
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>

      )
    
    }

      <footer className={!episode ? styles.empty : ''}>
        {episode && (
          <audio 
            src={episode.url}
            ref={audioRef}
            autoPlay
            loop={isLooping}
            onEnded={handleEpisodeEnded}
            onPlay={() => setIsPlayingState(true)}
            onPause={() => setIsPlayingState(false)}
            onLoadedMetadata={setupProgressListener}

          />
        )}

        <div className={styles.progress}>
          <span>      {convertDurationToTimeString(progress)}      </span>  {/* INICIAL */}
          <div className={styles.slider}>

            { !episode ? (
              <div className={styles.emptySlider} /> /* //slider QUANDO NÃO ESTÁ TOCANDO*/
            ) : (
              <Slider 
              max={episode.duration}
              value={progress}
              onChange={handleSeek}
              trackStyle={{ backgroundColor: '#04dd61' }}
              railStyle={{ backgroundColor: '#9f75ff'}}
              handleStyle={{ borderColor: '#04dd61', borderWidth: 4}}
              />
            )}
            



          </div>  
          <span> {convertDurationToTimeString(episode?.duration ?? 0)}  </span> {/* FINAL */}
        </div>

        <div className={styles.buttons}>
          <button type="button" disabled={ !episode || episodeList.length === 1} onClick={toggleShuffle} className={ isShuffling ? styles.isActive: ''}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button"  disabled={ !episode || !hasPrevious }  onClick={playPrevious}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
              { !isPlaying ? (
                <button type="button" className={styles.playButton}  disabled={ !episode } onClick={togglePlay}>
                  <img src="/play.svg" alt="Tocar" />
                </button>

              ):(
                <button type="button" className={styles.playButton}  disabled={ !episode } onClick={togglePlay}>
                  <img src="/pause.svg" alt="Tocar" />
                </button>

              ) }



          <button type="button" disabled={ !episode || !hasNext } onClick={playNext}>
            <img src="/play-next.svg" alt="Tocar Próxima" />
          </button>
          <button type="button" disabled={ !episode } onClick={toggleLoop} className={ isLooping ? styles.isActive: ''}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )

}