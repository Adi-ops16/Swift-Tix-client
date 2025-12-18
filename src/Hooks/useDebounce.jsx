import React, { useEffect, useState } from 'react'

export default function useDebounce(value, delay) {
    const [location, setLocation] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLocation(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [delay, value])

    return location
}

