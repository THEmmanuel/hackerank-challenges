// https://www.hackerrank.com/challenges/ctci-bfs-shortest-reach/problem

function processData(input) {
	const [q, ...rest] = input.split('\n');

	let rowCount = 0;
	for (let i = 0; i < Number(q); i++) {
		const [nodes, edges] = rest[rowCount++].split(' ');
		const adj = Array.from({
			length: Number(nodes) + 1
		}, () => []);

		for (let j = 0; j < edges; j++) {
			const [nodeFrom, nodeTo] = rest[rowCount++].split(' ')

			adj[nodeFrom].push(nodeTo);
			adj[nodeTo].push(nodeFrom);
		}

		const start = Number(rest[rowCount++])
		const queue = [start];

		const visited = Array.from({
			length: Number(nodes) + 1
		}, () => false);
		visited[start] = true;

		const distances = Array.from({
			length: Number(nodes) + 1
		}, () => -1);
		distances[start] = 0;

		while (queue.length) {
			const currentNode = queue.shift();
			const currentDistance = distances[currentNode];

			for (const neighbor of adj[currentNode]) {
				if (!visited[neighbor]) {
					distances[neighbor] = currentDistance + 6;
					visited[neighbor] = true;
					queue.push(neighbor);
				}
			}
		}

		distances.shift();
		distances.splice(start - 1, 1);
		console.log(distances.join(' '));
	}
}