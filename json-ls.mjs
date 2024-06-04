
self.onmessage = (ev) => {
	console.log(new ShadowRealm().evaluate(`(${ev.data})['pattern']`))
}


self.onerror = (ev) => {
	console.log(ev)
}


self.onmessageerror = (ev) => {
	console.log(ev)
}

