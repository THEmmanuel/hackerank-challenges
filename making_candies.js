// https://www.hackerrank.com/challenges/making-candies/problem

const balance = (m, w, candies, p) => {
	if (candies >= p) {
		const half = parseInt(parseInt(candies / p, 10) / 2, 10);
		m += half;
		w += half;
		candies -= 2 * half * p;
	}
	if (candies >= p) {
		m++;
		candies -= p;
	}

	return [m, w, candies];
}

function makingCandies(m, w, p, n) {
	let passes = 0;
	let candies = 0;
	let add = 0;
	let min = Number.MAX_SAFE_INTEGER;
	let dot = m * w;

	while (candies < n) {
		if ((candies + dot) < p) {
			add = parseInt((p - candies) / dot, 10);
			candies += dot * add;
			passes += add;
		}

		min = Math.min(min, passes + Math.ceil((n - candies) / dot));

		const difference = Math.abs(m - w);
		if (difference != 0) {
			if (candies >= (difference * p)) {
				add = difference;
			} else {
				add = parseInt(candies / p, 10);
			}
			candies -= add * p;

			if (m > w)
				w += add;
			else
				m += add;
		}

		[m, w, candies] = balance(m, w, candies, p);

		dot = m * w;
		candies += dot;
		passes++;
		min = Math.min(min, passes + Math.ceil((n - candies) / dot));
	}

	return Math.min(min, passes);
}

function main(input) {
	const [m, w, p, n] = input;

	console.log(makingCandies(m, w, p, n));
}

function processInput(input) {
	const processedInput = input.trim().split(' ').map(Number);

	return main(processedInput);
}


processInput('3 1 2 12');
