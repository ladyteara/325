	
#include <cstdlib>
#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <cstring>
#include <math.h>       /* pow() function */


// This line allows commonly-used functions to be used without specifying the 
// library in which that function is defined. For instance, this line allows
// the use of "cout" rather than the full specification "cout"
using namespace std;

class SetOfIntegers
{
 	public:
        // Constructor. Any setup operation you wish for the class.
        SetOfIntegers()
        {
            members.clear();
        } // end constructor

		
		void add(int m)  // Add members to set WITHOUT repetition
		{ 
			for (auto i : members)
			{
				if (i == m) return;  // no addition of existing member
			}
			members.push_back(m); 
		}
		int size() { return members.size(); }
		void show() { for (auto i: members) cout << i << "  "; cout << endl; }
		
		bool isMember(int m) 
		{
			//cout << "isMember(" << m << ") is ";
			for (auto i : members)
			{
				if (i == m) 
				{
					//cout << " true" << endl;
					return true;
				}
			}
			//cout << " false" << endl;
			return false;
		}
    
    private:
        vector<int> members;

};

//--------------------------------------------------------------------------
class Point
{

    public:
    
        // Constructor. Any setup operation you wish for the class.
        Point()
        {
            x = 0; y = 0;  
        } // end constructor
        Point(int a, int b, int id)
        {
            x = a; y = b; pointID = id;
        } // end constructor

        int getX() { return x; }
        int getY() { return y; }
        int getID() { return pointID; }
    
    private:
        int x = 0; 
        int y = 0;
		int pointID = 0;
        
}; // end class Point


//--------------------------------------------------------------------------
class Edge
{

    public:
    
        // Constructor. Any setup operation you wish for the class.
        Edge()
        {
            
        } // end constructor
        Edge(Point ptA, Point ptB)
        {
            pointA = ptA;
			pointB = ptB;
			length = sqrt(pow(abs(pointA.getX() - pointB.getX() ), 2) + pow(abs(pointA.getY() - pointB.getY() ), 2) );
        } // end constructor

        Point getPtA() { return pointA; }
        Point getPtB() { return pointB; }
		double getLen() { return length; }
		int getPtAID() { return pointA.getID(); }
		int getPtBID() { return pointB.getID(); }
    
    private:
        Point pointA;
        Point pointB;
		double length;
        
}; // end class Edge



// NOTE: DO NOT declare with empty parentheses, as vector<Point> myPointvector();
vector<Point> myPointvector;  // vector will expand as needed
vector<Edge> MinSpanTree;

		
		
// Pass arguments or parameters from command-line execution. argc is the count of
// those parameters, including the executable filename. argv[] is an array of the 
// parameters.
int main (int argc, char *argv[])
{
    string token;
    int xValue, yValue;
    ifstream fin;
	int coordPairs;  // number of coordinate pairs in the file
	int ptX, ptY;
	vector<Edge> unsortedEdgeVector;
	vector<Edge> sortedEdgeVector;
	
	int loopCounter;
	int pointCounter = 0;
	double MSTLength = 0.0;


    // Check the number of arguments. Expected: filename of a file
    if (argc != 2)  // This check is often hardcoded
    {   // If failure in parameters, offer advice for correction
        cout << "\nThis program uses command-line argument.\n";
        cout << "Usage: a.exe <filename>\n";
        exit(0);
    }



    try  // All lines within this block are part of the same exception handler
    {
        fin.open(argv[1]);
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
            

	// This line provides the graphic window setup. 
	cout << "800 600 white" << endl;
	
    fin >> coordPairs;
    while (fin >> ptX)
    {
        // Do something with the element read from the file
		// cout << ptX << endl;
		fin >> ptY;   
		// cout << ptY << endl;
		
		cout << "circle " << ptX << " " << ptY << " " << 20 << " seagreen" << endl;

		/*
		Point dummyPoint(ptX, ptY, pointCounter++);
		myPointvector.push_back(dummyPoint);  // vector will expand as needed
		
		cout << "Now myPointvector has size " << myPointvector.size() << endl;
		*/
		
    } // end while
                
    fin.close();

}
