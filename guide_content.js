var graph_guide_content = "Graphs: \
A graph is a non-linear data structure that consists of nodes/vertices and edges that connect them.\
The nodes can represent anything, such as cities, people, or web pages, and the edges represent the relationships between them.\
Graphs can be either directed or undirected, depending on whether the edges have a specific direction or not.\
Graphs can be weighted or unweighted, depending on whether the edges have a weight or not.\
Graphs can be represented using an adjacency matrix or adjacency list.\
Breadth First Search (BFS) is a graph traversal algorithm that visits all the nodes of a graph level by level. It starts at the root node and visits all the nodes at the same level before moving on to the next level. The time complexity of BFS is O(V + E), where V is the number of vertices and E is the number of edges in the graph.\
Depth first search is a graph traversal algorithm that visits all the vertices in a graph by exploring as far as possible along each branch before backtracking. The algorithm starts at a given vertex, and visits each vertex that is reachable from it. DFS has a time complexity of O(V+E), where V is the number of vertices and E is the number of edges in the graph.\
https://www.geeksforgeeks.org/introduction-to-graphs-data-structure-and-algorithm-tutorials/\
https://www.geeksforgeeks.org/graph-and-its-representations/\
https://www.geeksforgeeks.org/graph-types-and-applications/\
https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/\
https://youtu.be/oDqjPvD54Ss\
";
var stack_guide_content = "A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle.\
The last item added to the stack is the first one to be removed.\
Stacks have three primary operations: push, which adds an item to the top of the stack, pop, which removes the topmost item from the stack, and peek, which tells the topmost item of the stack.\
Stacks are commonly used in computer programming for tasks such as expression evaluation, memory management, and recursive function calls.\
Stacks can be implemented using arrays or linked lists.\
";
var dp_guide_content = "Dynamic Programming is a technique for solving complex problems by breaking them down into smaller, simpler subproblems.\
It is often used when the problem exhibits optimal substructure and overlapping subproblems.\
Optimal substructure means that the optimal solution to the problem can be obtained by combining the optimal solutions to its subproblems.\
Overlapping subproblems means that the same subproblems are repeatedly solved, and the results can be stored and reused to avoid redundant calculations.\
Dynamic programming involves solving the subproblems in a bottom-up manner, starting from the smallest subproblems and building up to the larger ones.\
The solutions to the subproblems are stored in a table or array, which can be used to solve the larger problem.\
Knapsack Problem is an optimization problem that involves selecting items to maximize value, subject to a weight constraint.\
It can be solved using dynamic programming by constructing a table of maximum value that can be obtained for each weight and subset of items.\
The optimal subset of items can be determined by tracing back through the table.\
The Knapsack Problem is NP-hard, but dynamic programming provides an efficient solution for many cases.\
";