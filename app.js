var link = process.argv.slice(2);

const open = require('open');

open(`${link}`, {
	app: {
		name: open.apps.chrome || open.apps.firefox
	}
});