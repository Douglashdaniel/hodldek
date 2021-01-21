const formateNumber = (number) => {
	const NumberWithCommas = (number) => {
		let parts = number.toString().split('.');
		return (
			parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
			(parts[1] ? '.' + parts[1] : '')
		);
	};
	if (number !== null && number !== undefined && number !== 0) {
		if (number > 1) {
			return NumberWithCommas(number.toFixed(2));
		} else {
			if (number === 1) {
				return NumberWithCommas(number.toFixed(2));
			}
			const newNumber = -Math.floor(Math.log(number) / Math.log(10) + 1);
			// console.log({ ath: number, 'number of zeros': newNumber });
			if (newNumber === 0) {
				return NumberWithCommas(number.toFixed(2));
			}
			if (newNumber >= 1) {
				// console.log({ 'what is the problem': newNumber });
				const added = Number(newNumber) + 2;
				return NumberWithCommas(number.toFixed(added));
			}
		}
	} else {
		return null;
	}
};

export default formateNumber;
