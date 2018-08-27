/*************************************************************
Tara Walton - Tara1984
Assn 1 - Prim's Algorithm

Meant to compile and run from VS 2013 PRofessional
--> draw.dat is created to run with BearPlot.py from cmd line.
***************************************************************/


#include<iostream>
#include<vector>
#include<algorithm>
#include<fstream>
#include<string>

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
	void show() { for (auto i : members) cout << i << "  "; cout << endl; }

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
	}											// end constructor
	Point(int a, int b, int id)
	{
		x = a; y = b; pointID = id;
	}											// end constructor

	int getX() { return x; }
	int getY() { return y; }
	int getID() { return pointID; }

private:
	int x = 0;
	int y = 0;
	int pointID = 0;

};												
//--------------------------------------------------------------------------

class Edge
{

public:

	// Constructor. Any setup operation you wish for the class.
	Edge()	{}									// end constructor
	Edge(Point ptA, Point ptB)
	{
		pointA = ptA;
		pointB = ptB;
		length = sqrt(pow(abs(pointA.getX() - pointB.getX()), 2) + pow(abs(pointA.getY() - pointB.getY()), 2));
	}											// end constructor

	Point getPtA() { return pointA; }
	Point getPtB() { return pointB; }
	double getLen() { return length; }
	int getPtAID() { return pointA.getID(); }
	int getPtBID() { return pointB.getID(); }

private:
	Point pointA;
	Point pointB;
	double length;

friend ostream& operator<<(ostream& out, Edge l);

};												// end class Edge;
//--------------------------------------------------------------------------

ostream& operator <<(ostream& out, Point l)
{
	cout << l.getX() << " " << l.getY() << " " << l.getID() << endl;
	return out;
}

ostream& operator <<(ostream& out, Edge l)
{
	cout << l.getPtAID() << " " << l.getPtBID() << " " << l.getLen() << endl;
	return out;
}
//--------------------------------------------------------------------------

bool sortByLength(Edge& lhs, Edge& rhs)
{ return lhs.getLen() < rhs.getLen(); }
//--------------------------------------------------------------------------

int main(/*int argc, char *argv[]*/)
{
	ifstream fin;
	ofstream fout;
	int coordPairs;														// number of coordinate pairs in the file
	int ptX, ptY;
	int pointCounter = 0;						
	vector<Point> ptVector;
	vector<Edge> edgeVector;
	SetOfIntegers includedPts;
	
	fin.open("\\trace\\tara1984\\Assn1\\SmallGraphAssn1.txt");			//!CHANGE TO DUMMY FILE NAME
	if (!fin.is_open())
	{
		cout << "File failed to open. Please make sure it is in the correct location and you have permisson to access this file.\n";
		return 0;
	}

	fout.open("\\trace\\tara1984\\Assn1\\draw.dat");
	if (!fin.is_open())
	{
		cout << "File failed to open. Please make sure you have permisson to write to this location.\n";
		return 0;
	}

	// This line provides the graphic window setup. 
	//cout << "800 600 white" << endl;
	fout << "800 600 white" << endl;

	/*****READ, CREATE ALL POINTS*****/
	fin >> coordPairs;
	while (fin >> ptX)
	{
		fin >> ptY;
		ptY = 600 - ptY;

		Point dummyPoint(ptX, ptY, pointCounter);
		ptVector.push_back(dummyPoint);				
		pointCounter++;
	}

	cout << "************ ALL PTS DRAWN ************" << endl << endl;

	/*****PRINT ALL EDGES*****/
	//SYNTAX - line startX startY endX endY optColor

	for (int i = 0; i < ptVector.size(); i++)
	{
		for (int j = 0; j < ptVector.size(); j++)
		{
			if (i != j)
			{
				cout << "line " << ptVector.at(i).getX() << " " << ptVector.at(i).getY()
					<< " " << ptVector.at(j).getX() << " " << ptVector.at(j).getY() << " gray50" << endl;
				fout << "line " << ptVector.at(i).getX() << " " << ptVector.at(i).getY()
					 << " " << ptVector.at(j).getX() << " " << ptVector.at(j).getY() << " gray50" << endl;
			}
		}
	}
	cout << "*********** ALL EDGES DRAWN ***********" << endl << endl;

	/*****CREATE EDGES*****/
	for (int i = 0; i < ptVector.size(); i++)
	{
		for (int j = i; j < ptVector.size(); j++)
		{
			if (i != j)
			{
				Edge dummyEdge(ptVector.at(i), ptVector.at(j));
				edgeVector.push_back(dummyEdge);
			}
		}
	}
	sort(edgeVector.begin(), edgeVector.end(), sortByLength);

	//Test output to screen to see vector of Edges
	cout << "Total points: " << ptVector.size() << endl << endl;
	cout << "A B Length" << endl;
	cout << "----------" << endl;
	for (int i = 0; i < edgeVector.size(); i++)
	{
		cout << edgeVector.at(i);
	}
	cout << "Number of Edges: " << edgeVector.size() << endl;
	//**********************************

	vector<Edge> vectorMST;									//Creating the blank MST
	int counter = 0;
	vectorMST.push_back(edgeVector.at(counter));			//add Edge to MST
	includedPts.add(edgeVector.at(counter).getPtAID());		//Add ptA to set
	includedPts.add(edgeVector.at(counter).getPtBID());		//Add ptB to set

	while (includedPts.size() != ptVector.size())
	{
		for (int i = 0; i < edgeVector.size(); i++)
		{
			if (!includedPts.isMember(edgeVector.at(i).getPtAID())/*!A*/ && includedPts.isMember(edgeVector.at(i).getPtBID()) /*B*/
				|| includedPts.isMember(edgeVector.at(i).getPtAID()) /*A*/ && !includedPts.isMember(edgeVector.at(i).getPtBID())) /*!B*/
				// (!A && B) || (A && !B))
			{
				vectorMST.push_back(edgeVector.at(i));
				includedPts.add(edgeVector.at(i).getPtAID());		//Add ptA to set
				includedPts.add(edgeVector.at(i).getPtBID());		//Add ptB to set
			}
			else 
			{
				continue;
			}
			cout << i << endl;
		}
		cout << "included Pts " << includedPts.size() << endl;
		includedPts.show();
	}
	
	/* PRINT ALL POINT AND THEIR LABELS*/				//so they are on top of the grey lines
	for (int i = 0; i < ptVector.size(); i++)
	{
		char label = ptVector.at(i).getID() + 65;		//char A
		if (label > 90)									// if all uppercase are used
		{
			label = ptVector.at(i).getID() + 97;		//shift to lower case ASCII letters
		}
		cout << "circle " << ptVector.at(i).getX() - 10 << " " << ptVector.at(i).getY() - 10 << " " << 20 << " cyan4" << label << endl;
		fout << "circle " << ptVector.at(i).getX() - 10 << " " << ptVector.at(i).getY() - 10 << " " << 20 << " cyan4" << endl;
		//SYNTAX - text pointX pointY fontsize word1 word2 word3 . . .
		fout << "text " << ptVector.at(i).getX() << " " << ptVector.at(i).getY() << " 16 " << label << endl;
	}
	cout << "************ ALL PTS DRAWN ************" << endl << endl;

	/* DRAW THE MST */
	for (int i = 0; i < vectorMST.size(); i++)
	{
				//line startX startY endX endY color
				cout << "line_solid " << vectorMST.at(i).getPtA().getX() << " " << vectorMST.at(i).getPtA().getY()
					<< " " << vectorMST.at(i).getPtB().getX() << " " << vectorMST.at(i).getPtB().getY() << " MediumOrchid4" << endl;
				fout << "line_solid " << vectorMST.at(i).getPtA().getX() << " " << vectorMST.at(i).getPtA().getY()
					<< " " << vectorMST.at(i).getPtB().getX() << " " << vectorMST.at(i).getPtB().getY() << " MediumOrchid4" << endl;
	}
	cout << "************ MST DRAWN ************" << endl << endl;
	fin.close();
	fout.close();
}