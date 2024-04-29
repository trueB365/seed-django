export function timeStringToSeconds(timeString: string) {
  const parts = timeString.split(':');
  let seconds = 0;

  if (parts.length === 2) {
    // Format: "MM:SS"
    const minutes = parseInt(parts[0], 10);
    seconds = parseInt(parts[1], 10);
    seconds += minutes * 60;
  } else if (parts.length === 3) {
    // Format: "HH:MM:SS"
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    seconds = parseInt(parts[2], 10);
    seconds += hours * 3600 + minutes * 60;
  }

  return seconds;
}
