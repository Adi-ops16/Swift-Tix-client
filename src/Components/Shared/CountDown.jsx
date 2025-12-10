import React from "react";
import useRemainingTime from "../../utils/time-calculation";

const Countdown = ({ departure }) => {
    const countdown = useRemainingTime(departure);

    if (countdown.expired) {
        return (
            <p className="text-red-600 font-semibold text-lg">
                Departure time has passed.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <TimeBox label="Days" value={countdown.days || 0} />
            <TimeBox label="Hours" value={countdown.hours || 0} />
            <TimeBox label="Minutes" value={countdown.minutes || 0} />
            <TimeBox label="Seconds" value={countdown.seconds || 0} />
        </div>
    );
};


const TimeBox = ({ label, value }) => (
    <div className="bg-white shadow rounded-xl py-3">
        <p className="text-3xl font-bold text-[#5b3f2d]">{value}</p>
        <p className="text-gray-600 text-sm">{label}</p>
    </div>
);

export default Countdown;