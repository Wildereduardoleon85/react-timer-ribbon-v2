import React, { useEffect, useState } from 'react'
import './TimerApp.css'

function TimerApp() {
  /**
   * Duration in milliseconds of the custom catalog session
   */
  const USER_ID_TIME_SESSION = 36000000
  const [remainingTime, setRemainingTime] = useState(0)
  const expirationTimeFromLocalStorage = JSON.parse(
    localStorage.getItem('sessionTimeStamp')
  )

  const now = Date.now()

  useEffect(() => {
    let expirationTime

    if (!expirationTimeFromLocalStorage) {
      expirationTime = now + USER_ID_TIME_SESSION
      localStorage.setItem('sessionTimeStamp', JSON.stringify(expirationTime))
    } else {
      expirationTime = expirationTimeFromLocalStorage
    }

    const interval = setInterval(() => {
      setRemainingTime(expirationTime - now)
    }, 1000)

    /**
     * reset values once the timer has expired
     */
    if (remainingTime < 0 || remainingTime > USER_ID_TIME_SESSION) {
      localStorage.removeItem('sessionTimeStamp')
      setRemainingTime(0)
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [remainingTime, expirationTimeFromLocalStorage])

  /**
   * Transform milliseconds remaining time into date format to be able to extract the desired
   * values, in this case; minutes and seconds
   */
  const time = new Date(remainingTime)

  const formattedMinutes = String(time.getMinutes()).padStart(2, '0')
  const formattedSeconds = String(time.getSeconds()).padStart(2, '0')

  return (
    <div className='container'>
      <h1>{`Tienes 00:${formattedMinutes}:${formattedSeconds} para revisar tu catálogo personalizado`}</h1>
    </div>
  )
}

export default TimerApp
