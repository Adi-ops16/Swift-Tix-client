import { useEffect, useState } from "react"

const useRemainingTime = departure => {
    const calculateRemainingTime = (departureTime) => {
        const dateTime = new Date(departureTime)
        const departureTimeMS = dateTime.getTime()
        const usersCurrentTimeMS = Date.now()
        const remainingTime = departureTimeMS - usersCurrentTimeMS

        if (remainingTime <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60)
        const seconds = Math.floor((remainingTime / (1000)) % 60)

        return { days, hours, minutes, seconds, expired: false }
    }
    const [timeLeft, setTimeLeft] = useState(() => calculateRemainingTime(departure))

    useEffect(() => {
        if (!departure) return
        const intervalId = setInterval(() => {
            const newTimeLeft = calculateRemainingTime(departure)
            setTimeLeft(newTimeLeft)

            if (newTimeLeft.expired) {
                clearInterval(intervalId)
            }
            return () => clearInterval(intervalId)
        }, 1000)
    }, [departure])
    return timeLeft
}

export default useRemainingTime;