import React, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Colors from "../../constants/Colors";
import { View } from "react-native";
import moment from "moment";

const UserCalendar = ({ history }: { history: any[] }) => {
  const format2 = "YYYY-MM-DD";
  const [selectedDate, setSelected] = useState(
    history.map((history) => moment(history.timestamp.toDate()).format(format2))
  );
  const selected = selectedDate.reduce((acc, dateString) => {
    acc[dateString] = { selected: true };
    return acc;
  }, {});

  console.log(selected);
  return (
    <View style={{}}>
      <Calendar
        markedDates={{
          ...selected,
        }}
        onDayPress={(day) => console.log(day.dateString)}
        theme={{
          backgroundColor: Colors.card,
          textDayHeaderFontFamily: "Medium",
          calendarBackground: Colors.card,
          textSectionTitleColor: "#b6c1cd",
          textDayStyle: { color: Colors.text, fontFamily: "Medium" },
          arrowColor: Colors.cold,
          selectedDayBackgroundColor: "#00adf5",
          todayTextColor: Colors.cold,
        }}
        style={{ borderRadius: 20, padding: 10, justifyContent: "center" }}
      />
    </View>
  );
};

export default UserCalendar;
