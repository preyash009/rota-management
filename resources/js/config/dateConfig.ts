// Date format configuration
export const DATE_FORMATS = {
  // Display formats
  DISPLAY_DATE: 'MMM dd, yyyy',           // Jan 15, 2024
  DISPLAY_DATE_SHORT: 'MMM dd',           // Jan 15
  DISPLAY_TIME: 'h:mm:ss a',              // 2:30:00 PM
  DISPLAY_DATETIME: 'MMM dd, yyyy HH:mm', // Jan 15, 2024 14:30
  
  // Input formats
  INPUT_DATE: 'yyyy-MM-dd',               // 2024-01-15 (HTML date input)
  INPUT_TIME: 'HH:mm',                    // 14:30 (HTML time input)
  
  // Week display
  WEEKDAY_SHORT: 'EEE',                   // Mon, Tue, Wed
};

// Utility functions for date formatting
export const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return dateString;
  }
};

export const formatTime = (time: string): string => {
  try {
    // Handle ISO datetime format like "2026-01-19T16:00:00.000000Z"
    if (time.includes('T')) {
      const date = new Date(time);
      return date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      });
    }
    
    // Handle time strings like "14:30" or "14:30:00"
    if (time.includes(':')) {
      const parts = time.split(':');
      const hours = parseInt(parts[0]);
      const minutes = parts[1].padStart(2, '0');
      const seconds = parts[2] ? parts[2].padStart(2, '0') : '00';
      
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      
      return `${displayHours}:${minutes}:${seconds} ${period}`;
    }
    
    return time;
  } catch (error) {
    console.error('Time formatting error:', error);
    return time;
  }
};

export const formatWeekRange = (startDate: string): string => {
  try {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  } catch (error) {
    console.error('Week range formatting error:', error);
    return '';
  }
};

export const formatWeekday = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Weekday formatting error:', error);
    return dateString;
  }
};