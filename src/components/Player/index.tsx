import Image from "next/image";
import { useContext } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";

export const Player = () => {
  const {episodeList, currentEpisodeIndex} = useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];
  
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="playingNow" />
        <strong>Tocando Agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image width={592} height={592} src={episode.thumbnail} objectFit="cover"/>
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}
           
      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          { episode ? (
            <Slider 
              trackStyle={{backgroundColor: '#04d361'}} 
              railStyle={{backgroundColor: '#9f75ff'}} 
              handleStyle={{borderColor: '#04d361', borderWidth: 4}}/>
          ) : (
            <div className={styles.slider}>
              <div className={styles.emptySlider} />
            </div>
          )}
          <span>00:00</span>
        </div>

        {episode && (
          <audio 
            src={episode.url} 
            autoPlay
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="shuffle" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="playPrevious" />
          </button>
          <button className={styles.playButton} type="button" disabled={!episode}>
            <img src="/play.svg" alt="play" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="playNext" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="repeat" />
          </button>
        </div>
      </footer>
    </div>
  );
};
