var values = [10, 20, 30, 40];
var weights = [30, 10, 40, 20];
var capacity = 40;
var data = {
	nodes: [
		{
			id: 1,
		},
		{
			id: 2,
		},
		{
			id: 3,
		},
		{
			id: 4,
		},
		{
			id: 5,
		},
		{
			id: 6,
		},
	],
	links: [
		{
			source: 1,
			target: 2,
		},
		{
			source: 2,
			target: 3,
		},
		{
			source: 4,
			target: 2,
		},
		{
			source: 3,
			target: 5,
		},
		{
			source: 1,
			target: 6,
		},
		{
			source: 5,
			target: 6,
		},
	],
};