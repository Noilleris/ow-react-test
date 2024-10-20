const prettifyDateTime = (str: string) => {
  const [date, time] = str.split("T");

  const [year, month, day] = date.split("-")

  const [hour, minute] = time.split(":")

  return `${day}-${month}-${year} ${hour}:${minute}`
}

export default prettifyDateTime;