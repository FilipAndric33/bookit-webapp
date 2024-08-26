import { isSameDay } from "date-fns";

const isDateAvailableV1 = (date, availableDates) => {
    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    return availableDates.some(availableDate => isSameDay(normalizedDate, availableDate));
};

export default isDateAvailableV1;