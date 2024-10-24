interface Graph {
  [key: string]: { [key: string]: number };
}
const nodegraph: Graph = {
  A: { B: 4, C: 6 },
  B: { A: 4, F: 2 },
  C: { D: 8 },
  D: { C: 8, E: 4, G: 1 },
  E: { D: 4, F: 3, I: 8 },
  F: {
    B: 2, E: 3, G: 4, H: 6,
  },
  G: {
    D: 1, F: 4, H: 5, I: 5,
  },
  H: { F: 6, G: 5 },
  I: { G: 5, E: 8 },
};

function dijkstra(nodegraph: Graph, startNode: string, endNode: string) {
  const distances: { [key: string]: number } = {};
  const visited: { [key: string]: boolean } = {};
  const previous: { [key: string]: string | null } = {};
  const pQueue: { [key: string]: number } = {};

  Object.keys(nodegraph).forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
    pQueue[node] = Infinity;
  });

  distances[startNode] = 0;
  pQueue[startNode] = 0;

  while (Object.keys(pQueue).length > 0) {
    const cNode = Object.keys(pQueue).reduce((a, b) => pQueue[a] < pQueue[b] ? a : b);
    if (cNode === endNode) break;
    delete pQueue[cNode];
    visited[cNode] = true;
    for (const neighbor in nodegraph[cNode]) {
      if (!visited[neighbor]) {
        const newDistance = distances[cNode] + nodegraph[cNode][neighbor];
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = cNode;
          pQueue[neighbor] = newDistance;
        }
      }
    }
  }

  const path: string[] = [];
  let cNode = endNode;

  while (cNode) {
    path.unshift(cNode);
    cNode = previous[cNode]!;
  }

  return { distance: distances[endNode], path };
}

export { nodegraph, dijkstra };
