import { createContext } from 'react'
 interface Episode{
   title: string,
   members: string,
   duration: number,
   thumbnail: string,
   url: string
 }


interface PlayerContextData{
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  play: (episode: Episode) => void

}


export const PlayerContext = createContext({} as PlayerContextData)


