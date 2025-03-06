// export function formatMessageTime(date) {
//   return new Date(date).toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });
// }

//Updated to 
export function formatMessageTime(date) {
  const timeString = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // "1:35 PM" → ["1:35", "PM"] → "PM 1:35"
  const [time, period] = timeString.split(" ");
  return ` ${time}${period}`;
}
