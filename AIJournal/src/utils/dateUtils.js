import { format, parseISO } from 'date-fns';

export const formatJournalDate = (dateString) => {
  return format(parseISO(dateString), "MMM dd, yyyy • h:mm a");
};