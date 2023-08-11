
  // convert date from 2023/22/33 to jun 15th 23
  export  const useDateConvert = (date) => {
    const inputDate = date;
    const dateParts = inputDate.split("/");

    const year = dateParts[0].slice(2); // Extract the last two digits of the year
    const month = dateParts[1];
    const day = dateParts[2];
    const convertedDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2]
    );
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate =
      dayNames[convertedDate.getDay()] +
      " " +
      monthNames[convertedDate.getMonth()] +
      " " +
      day +
      getDaySuffix(day) +
      " " +
      year;

    function getDaySuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      const lastDigit = day % 10;
      switch (lastDigit) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    return formattedDate;
  };
