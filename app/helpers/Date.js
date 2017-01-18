const Date = {
    format(date) {
        let dateObj = new window.Date(date);
        let options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
        return dateObj.toGMTString();
    }
}

export default Date;
