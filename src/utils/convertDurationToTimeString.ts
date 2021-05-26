export function convertDurationToTimeString(duration: number): string{ //força que eu receba um numero como parameto e força que eu retorne uma string como resultado

  const hours = Math.floor(duration / 3600) //(60 * 60)
  const minutes = Math.floor((duration % 3600)/ 60) 
  const seconds = duration % 60

  const timeString = [hours, minutes, seconds].map(unit => String(unit).padStart(2,'0')).join(':') //ESSA FUNÇÃO ACRESCENTA O ZERO CASO SÓ TENHA UM NUMERO NA UNIT

  return timeString
}