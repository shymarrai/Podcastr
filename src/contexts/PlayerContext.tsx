import { createContext, ReactNode, useState } from 'react'
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
  isPlaying: boolean;
  hasNext: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasPrevious: boolean;
  togglePlay: () => void;
  toggleLoop: () => void;
  clearPlayerState: () => void;
  toggleShuffle: () => void;
  playPrevious: () => void;
  playNext: () => void;
  playList: (list: Array<Episode>, index: number) => void;
  setIsPlayingState: (state: boolean) => void;
  play: (episode: Episode) => void;

}


export const PlayerContext = createContext({} as PlayerContextData)



interface PlayerContextProviderProps{
  children: ReactNode //DEFINE QUE O TIPO children(parametro que será recebido com todos os elementos) 
                      //é do tipo ReactNode ou seja qualquer elemento html, jsx..
}

export function PlayerContextProvider({children}: PlayerContextProviderProps){
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }



  function togglePlay(){
    setIsPlaying(!isPlaying)
  }

  function toggleLoop(){
    setIsLooping(!isLooping)
  }
  function toggleShuffle(){
    setIsShuffling(!isShuffling)
  }

  function setIsPlayingState(state: boolean){
    setIsPlaying(state)
  }


  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext(){
    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    }else if(hasNext){
      setCurrentEpisodeIndex((currentEpisodeIndex + 1))
    }    
    
  }
  function playPrevious(){
    if(hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
    
  }

    
  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0)
  }

  return(
    <PlayerContext.Provider 

    value={{
      episodeList, 
      currentEpisodeIndex, 
      play,
      toggleShuffle,
      isShuffling,
      playList,
      playPrevious,
      playNext,
      hasNext,
      clearPlayerState,
      hasPrevious,
      isPlaying,
      isLooping,
      toggleLoop,
      togglePlay, 
      setIsPlayingState 
    }}>

      {children}
    </PlayerContext.Provider>
  )
}
/* 
export const useContext = () => {
  return useContext(PlayerContext)
}

 */