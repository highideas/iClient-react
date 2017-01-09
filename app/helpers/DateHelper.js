const DateHelper = {
    formateDate(date) {
        let dateObj = new Date(date);
        let options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
        return dateObj.toLocaleDateString("en-US", options);
    }
}

export default DateHelper;
