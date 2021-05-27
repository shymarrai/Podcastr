import Image from 'next/image';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'



export default function Player(){  
  
  const {episodeList, currentEpisodeIndex} = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex]


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
            autoPlay

          />
        )}

        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>

            { !episode ? (
              <div className={styles.emptySlider} /> /* //slider QUANDO NÃO ESTÁ TOCANDO*/
            ) : (
              <Slider 
              trackStyle={{ backgroundColor: '#04dd61' }}
              railStyle={{ backgroundColor: '#9f75ff'}}
              handleStyle={{ borderColor: '#04dd61', borderWidth: 4}}
              />
            )}
            



          </div>  
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button" disabled={ !episode }>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button"  disabled={ !episode }>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className={styles.playButton}  disabled={ !episode }>
            <img src={ !episode ? "/play.svg" : "/pause.svg"} alt="Tocar" />
          </button>
          <button type="button" disabled={ !episode }>
            <img src="/play-next.svg" alt="Tocar Próxima" />
          </button>
          <button type="button" disabled={ !episode }>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )

}