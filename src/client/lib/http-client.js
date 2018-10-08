export default {
	get(url) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			req.onreadystatechange = () => {
				if (req.readyState === 4 && req.status === 200) {
					resolve(JSON.parse(req.responseText));
				}
			};
			req.open('GET', url, true);
			req.send(null);
		});
	}
};
