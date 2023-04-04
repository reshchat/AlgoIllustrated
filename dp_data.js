var values = [1, 2, 3, 4];
var weights = [3, 1, 4, 2];
var capacity = 4;
var labs = ["item index","value","weight","capacity"]
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