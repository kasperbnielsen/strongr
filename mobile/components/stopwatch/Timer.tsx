import { useState } from 'react';
import { Text } from 'react-native';

export default function Timer({ startTime }: { startTime: Date }) {
  const [time, setTime] = useState<[number, number, number]>([0, 0, 0]);

  const timer = setInterval(() => {
    const y = (Date.now() - startTime.getTime()) / 1000;
    const hours = Math.floor(y / 3600);
    const minutes = Math.floor((y % 3600) / 60);
    const seconds = Math.floor((y % 3600) % 60);
    setTime([hours, minutes, seconds]);
    console.log(
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`
    );
  }, 500);

  return (
    <Text style={{ fontSize: 12 }}>{`${time[0].toString().padStart(2, '0')}:${time[1]
      .toString()
      .padStart(2, '0')}:${time[2].toString().padStart(2, '0')}`}</Text>
  );
}
