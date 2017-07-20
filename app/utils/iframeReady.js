export default function iFrameReady(iFrame, fn) {
	let timer;
	let fired = false;

	function ready() {
		if (!fired) {
			fired = true;
			clearTimeout(timer);
			fn.call(this);
		}
	}

	function readyState() {
		if (this.readyState === 'complete') {
			ready.call(this);
		}
	}

	// cross platform event handler for compatibility with older IE versions
	function addEvent(elem, event, fn) {
		if (elem.addEventListener) {
			return elem.addEventListener(event, fn);
		}

		return elem.attachEvent(`on${event}`, () => fn.call(elem, window.event));
	}

	// use iFrame load as a backup - though the other events should occur first
	addEvent(iFrame, 'load', () => {
		ready.call(iFrame.contentDocument || iFrame.contentWindow.document);
	});

	function checkLoaded() {
		try {
			const doc = iFrame.contentDocument || iFrame.contentWindow.document;
			// We can tell if there is a dummy document installed because the dummy document
			// will have an URL that starts with 'about:'.  The real document will not have that URL
			if (doc.URL.indexOf('about:') !== 0) {
				if (doc.readyState === 'complete') {
					ready.call(doc);
				} else {
					// set event listener for DOMContentLoaded on the new document
					addEvent(doc, 'DOMContentLoaded', ready);
					addEvent(doc, 'readystatechange', readyState);
				}
			} else {
				// still same old original document, so keep looking for content or new document
				timer = setTimeout(checkLoaded, 100);
			}
		} catch (e) {
			timer = setTimeout(checkLoaded, 100);
		}
	}

	checkLoaded();
}
