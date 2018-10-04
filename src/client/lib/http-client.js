export default class HttpClient {

	get(url, callback) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = () => { 
			if (req.readyState == 4 && req.status == 200) {
				callback(null, req.responseText);
			}
		};
		req.open('GET', url, true);            
		req.send(null);
	}
}
