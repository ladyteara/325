// Adapted from http://www.geeksforgeeks.org/greedy-algorithms-set-6-dijkstras-shortest-path-algorithm/
// A C / C++ program for Dijkstra's single source shortest path algorithm.
// The program is for adjacency matrix representation of the graph
 
// Compile this program from the command line using     
//      g++ -std=c++11 ModelSampleProgram.cpp
// Compile this program in an IDE (CodeBlocks, VisualStudio, etc.) by 
//     setting compiler to use C++11 standard

// Each of these include files is required to use some function 
// that is defined in that file. 
#include <cstdlib>
#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <cstring>
#include <cfloat>			// to use DBL_MAX

// This line allows commonly-used functions to be used without specifying the 
// library in which that function is defined. For instance, this line allows
// the use of "cout" rather than the full specification "cout"
using namespace std;


/////////////////////////////////////////////////////////////////////////////
// This class provides a two-element data object to describe an edge from 
class Point
{
	public:
		double xCoord = 0;  // X coordinate of this point
		double yCoord = 0;  // Y coordinate of this point
};



/////////////////////////////////////////////////////////////////////////////
// This class provides a two-element data object to describe an edge from 
// a known source vertex to the vertex identified in this object, with the
// edge weight identified in this object.
class EdgeDest
{
	public:
		int vertex;				// identifying number of one of the V vertices of this graph.
		double weight;			// weight on the edge from the source vertex to this destintion vertex
		bool selected = false;  // whether this edge was a part of the Dijkstra's single-source, shortest-path tree
};

/////////////////////////////////////////////////////////////////////////////
// If an edge in the graph exists, the edge has a nonzero, positive weight. 
// Zero or negative values indicate absence of edge.
class Graph
{
	public:
		Graph( ) // Constructor. Any setup operation you wish for the class.
		{ } // end constructor

		Graph(string filename) // Constructor. Any setup operation you wish for the class.
        {
			string stringData;
			int intData;
			double doubleData;
			ifstream fin;
			
			// cout << "Graph constructor:  filename is " << filename << endl;
			
			try  // All lines within this block are part of the same exception handler
			{
				fin.open(filename);  // Open the file for reading
			} 
			catch (exception& ex) 
			{
				cout << ex.what();  // display standard explanation of the exception
				exit(0);  // exit the program
			}
            
			// Read from the file, one token at a time. If the type of token is known, it
			// can be read into a corresponding variable type, such as 
			//          in >> x;    // Read the first item into an integer variable x.
			//          in >> str;  // Read the next item into a string variable str.
            
			int numV;
			fin >> numV;
			V = numV;
			// cout << "number of vertices is " << numV << endl;
			
			edges = vector<vector<EdgeDest>>(numV);  // re-allocate edges with the known number of vertices
			
			coords = vector<Point>(numV); // re-allocate coordinates with the known number of vertices
			
			// Read the (x,y) coordinates of all vertices and store in structure.
			for (int i = 0; i < numV; i++)
			{
				double xData, yData;
				fin >> xData;
				fin >> yData;
				// cout << "  vertex " << i << ":  (" << xData << ",  " << yData << ")" << endl;
				Point dummyPoint;
				dummyPoint.xCoord = xData;
				dummyPoint.yCoord = yData;
				// cout << "  so that's (" << dummyPoint.xCoord << ",  " << dummyPoint.yCoord << ")" << endl;
				
				cout << "oval " << (dummyPoint.xCoord - 5) << " " << (dummyPoint.yCoord - 5) << 
						" " << (dummyPoint.xCoord + 5) << " " << (dummyPoint.yCoord + 5) << " lightblue" << endl;
				cout << "text " << (dummyPoint.xCoord - 10) << " " << (dummyPoint.yCoord - 10) << " 22 " <<  i << endl;

				coords[i] = dummyPoint;

				/*
				cout << "Coords of this vertex:";
				cout << " vertex " << i << " is located at (" << coords[i].xCoord << ", " << coords[i].yCoord << ")" << endl << endl;
				*/
				
			}
		
			int numE;
			double weight;
			fin >> numE;
			// cout << "number of edges is " << numE << endl;
	
			// Read all edges and push edge data into appropriate structure
			for (int i = 0; i < numE; i++)
			{
				EdgeDest dummyEdge; 
				int sourceVertex; 
				int destVertex; 
				fin >> sourceVertex;
				fin >> destVertex;
				fin >> weight;
				//cout << "  edge " << i << ":  " << sourceVertex << " --> ";
				//cout << "  " << destVertex << endl;
				//cout << "    with weight " << weight << endl;

				dummyEdge.vertex = destVertex;
				dummyEdge.weight = weight;
				edges[sourceVertex].push_back(dummyEdge);
			}	
                
			fin.close();  // Close the file after use
			
			/*
			// display all edges
			for (int i = 0; i < numV; i++)  // Source vertex for edge
			{
				for (int j = 0; j < edges[i].size(); j++)  // Destination vertex for edge
				{
					cout << " ***** vertex " << i << " has edge to vertex " << 
							edges[i].at(j).vertex << " with weight " << edges[i].at(j).weight << endl;
				}
			}
			*/
			
			//cout << "leaving constructor" << endl;
			
        } // end constructor
		
		// --------------------------------------------------------------------
		bool isEdge(int a, int b) // Does there exist an edge a ---> b?
		{ 
			// Check every adjacent vertex to see if a --> b.
			for (int j = 0; j < edges[a].size(); j++)  // Each vertex adjacent to a
			{
				if (edges[a].at(j).vertex == b)
				{
					return true;
				}
			}

			return false;  // Default return value
		}
		
		// --------------------------------------------------------------------
		double edgeWeight(int a, int b) // Weight of edge a ---> b
		{ 
			// Check every adjacent vertex to see if a --> b.
			for (int j = 0; j < edges[a].size(); j++)  // Each vertex adjacent to a
			{
				if (edges[a].at(j).vertex == b)
				{
					return edges[a].at(j).weight;
				}
			}

			return -1.0;   // Default return value
		}

		// --------------------------------------------------------------------
		void setSelected(int a, int b) // identify this edge as a part of Dijkstra's single-source, shortest-path tree
		{ 
			// Find vertex b adjacent to a, and identify that edge as selected.
			for (int j = 0; j < edges[a].size(); j++)  // Each vertex adjacent to a
			{
				if (edges[a].at(j).vertex == b)
				{
					edges[a].at(j).selected = true;
				}
			}
		}
		
		// --------------------------------------------------------------------
		int numVerts() // number of vertices
		{ 
			return edges.size();  // number of entries in the "adjacency vector" 
		}  

		// --------------------------------------------------------------------
		double getX(int a) { return coords[a].xCoord; }
		double getY(int a) { return coords[a].yCoord; }
		int getV() { return V; }
		double getDestID(int i, int j) { return edges.at(i).at(j).vertex; }
		
		int neighborsOf(int j) { return edges.at(j).size(); }  // Number of neighbors of vertex j
		
		bool isEdgeSelected(int i, int j) // is this edge a part of Dijkstra's single-source, shortest-path tree?
		{ return edges.at(i).at(j).selected; }

		// --------------------------------------------------------------------
	private:
		vector<vector<EdgeDest>> edges;
		vector<Point> coords;
		int V;  // The number of vertices in graph, which are numbered 0...(V-1).
	
}; // end class Graph

/////////////////////////////////////////////////////////////////////////////
// A utility function to find the vertex with minimum distance value, from
// the set of vertices not yet included in shortest path tree
int minDistance(Graph g, int dist[], bool sptSet[])
{
   // Initialize min value
   int min = DBL_MAX, min_index;
 
   for (int v = 0; v < g.getV(); v++)
     if (sptSet[v] == false && dist[v] <= min)
         min = dist[v], min_index = v;
 
   return min_index;
}
 
/////////////////////////////////////////////////////////////////////////////
// A utility function to print the constructed distance array
int printSolution(Graph g, int dist[], int n)
{
   printf("Vertex   Distance from Source\n");
   for (int i = 0; i < g.getV(); i++)
      printf("%d \t\t %d\n", i, dist[i]);
}
 
 /////////////////////////////////////////////////////////////////////////////
// Funtion that implements Dijkstra's single source shortest path algorithm
// for a graph represented using adjacency matrix representation
void dijkstra(Graph g, int sourceVert, int destVert)
{
	int dist[g.getV()];			// The output array.  dist[i] will hold the shortest distance from sourceVert to i
 
	bool sptSet[g.getV()];		// sptSet[i] will true if vertex i is included in shortest path tree or shortest distance from sourceVert to i is finalized

	// Initialize all distances as INFINITE and stpSet[] as false
	for (int i = 0; i < g.getV(); i++)
		dist[i] = DBL_MAX, sptSet[i] = false;
 
	// Distance of source vertex from itself is always 0
	dist[sourceVert] = 0;
 
	// Find shortest path for all vertices
	for (int count = 0; count < g.getV()-1; count++)
	{
		// Pick the minimum distance vertex from the set of vertices not yet processed. u is always equal to sourceVert in first iteration.
		int u = minDistance(g, dist, sptSet);
 
		// Mark the picked vertex as processed
		sptSet[u] = true;
 
		// Update dist value of the adjacent vertices of the picked vertex.
		for (int v = 0; v < g.getV(); v++)
		{
 
			// Update dist[v] only if is not in sptSet, there is an edge from u to v, and total weight of path from sourceVert to v through u is smaller than current value of dist[v]
			if (!sptSet[v] && g.isEdge(u, v) &&				// graph[u][v] and 
				dist[u] != DBL_MAX && 
				dist[u] + g.edgeWeight(u, v) < dist[v])		// dist[u] + graph[u][v] < dist[v])
			{
									   
				dist[v] = dist[u] + g.edgeWeight(u, v);		// dist[v] = dist[u] + graph[u][v];
				
				//cout << "Chosen: edge from " << u << " to " << v << " with weight " << g.edgeWeight(u, v) << endl;
				cout << "line " << g.getX(u) << " " << g.getY(u) << " " <<
								   g.getX(v) << " " << g.getY(v) << " " << endl;

				/*
				cout << "text " << ((coords[u].xCoord + coords[v].xCoord) / 2) << " " << 
					((coords[u].yCoord + coords[v].yCoord) / 2) << " 14 " <<  weight << endl;
				*/
				cout << "text " << ((g.getX(u) + g.getX(v)) / 2) << " " << 
								   ((g.getY(u) + g.getY(v)) / 2) << " 14 " <<  g.edgeWeight(u, v) << endl;

					
				g.setSelected(u, v);  // Tag this edge as part of Dijkstra's single-source, shortest-path tree
			}
			
		}

	}
 
	// print the constructed distance array
	// printSolution(g, dist, g.getV());
	 
	 
	//cout << "Chosen: edge from " << sourceVert << " to " << destVert << " has cost " << dist[destVert] << endl;
	cout << "text 200 350 16 edge from " << sourceVert << " to " << destVert << " has cost " << dist[destVert] << endl;

	cout << "text 200 400 16 Vertex" << endl;
	cout << "text 500 400 16 Distance from Source" << endl;
	for (int temp_i = 0; temp_i < g.getV(); temp_i++)
	{
		cout << "text 200 " << (450 + (temp_i * 25)) << " 16 " << temp_i << endl;
		cout << "text 500 " << (450 + (temp_i * 25)) << " 16 " << dist[temp_i] << endl;
	}

	  
} // end dijkstra


/////////////////////////////////////////////////////////////////////////////
// Pass arguments or parameters from command-line execution. argc is the count of
// those parameters, including the executable filename. argv[] is an array of the 
// parameters.
int main (int argc, char *argv[])
{

	int targetVert;  // vertex for which the shortest distance from 0 is desired
	
    // Check the number of arguments. Expected: filename of a file
    if (argc != 3)  // This check is often hardcoded
    {   // If failure in parameters, offer advice for correction
        cout << "\nThis program uses command-line argument.\n";
        cout << "Usage: a.exe <filename> <TargetVertex>\n";
        exit(0);
    }


	// convert argv[2] from string to integer
	try  // All lines within this block are part of the same exception handler
	{
		targetVert = atoi (argv[2]);  // convert argv[2] from string to integer
		//cout << "\nThe targetVert read from command line is " << targetVert << endl;
	} 
	catch (exception& ex) 
	{
		cout << ex.what();  // display standard explanation of the exception
		exit(0);			// exit the program
	}
            

 	cout << "700 700 white" << endl;	// initialize graphic output
	 
	// test edges
	Graph g = Graph(argv[1]);			// pass filename to Graph constructor
	
    dijkstra(g, 0, targetVert);
 
    return 0;
}
