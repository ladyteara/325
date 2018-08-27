#include<iostream>
#include<vector>
#include<algorithm>
#include<fstream>
#include<string>


using namespace std;

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

};												// end class Point

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

};												// end class Edge

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

bool sortByLength(Edge& lhs, Edge& rhs)
{ return lhs.getLen() < rhs.getLen(); }

int main(/*int argc, char *argv[]*/)
{
	ifstream fin;
	ofstream fout;
	int coordPairs;								// number of coordinate pairs in the file
	int ptX, ptY;
	int pointCounter = 0;						
	vector<Point> ptVector;
	vector<Edge> edgeVector;

	
	fin.open("C:\\Users\\Tara\\Desktop\\Assn1\\SmallGraphAssn1.txt");			//!CHANGE TO DUMMY FILE NAME
	if (!fin.is_open())
	{
		cout << "File failed to open. Please make sure it is in the correct location and you have permisson to access this file.\n";
		return 0;
	}

	fout.open("C:\\Users\\Tara\\Desktop\\Assn1\\draw.dat");
	if (!fin.is_open())
	{
		cout << "File failed to open. Please make sure you have permisson to write to this location.\n";
		return 0;
	}

	// This line provides the graphic window setup. 
	//cout << "800 600 white" << endl;
	fout << "800 600 white" << endl;

	/*****READ, CREATE, and PRINT ALL POINTS*****/
	fin >> coordPairs;
	while (fin >> ptX)
	{
		fin >> ptY;
		ptY = 600 - ptY;

		//cout << "circle " << ptX + 10 << " " << ptY + 10 << " " << 20 << " cyan4" << endl;
		fout << "circle " << ptX - 10 << " " << ptY - 10 << " " << 20 << " cyan4" << endl;
		Point dummyPoint(ptX, ptY, pointCounter);
		ptVector.push_back(dummyPoint);			// vector will expand as needed
		pointCounter++;
	}

	cout << "************ ALL PTS DRAWN ************" << endl << endl;

	/*****PRINT ALL EDGES*****/
	//line startX startY endX endY optColorf

	for (int i = 0; i < ptVector.size(); i++)
	{
		for (int j = 0; j < ptVector.size(); j++)
		{
			if (i != j)
			{
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

	cout << "Total points: " << ptVector.size() << endl << endl;
	cout << "A B Length" << endl;
	cout << "----------" << endl;
	for (int i = 0; i < edgeVector.size(); i++)
	{
		cout << edgeVector.at(i);
	}
	cout << edgeVector.size() << endl;
	//cout << "done";

	vector<Edge> vectorMST;							//Creating the blank MST
	int counter = 0;
	vectorMST.push_back(edgeVector.at(counter));
	do
	{
		//shortest edge not already included in MST
		//if A or B, not both.
		
		vectorMST.push_back(edgeVector.at(counter));

		cout << vectorMST.at(counter).getPtAID() << " " << vectorMST.at(counter).getPtBID() <<endl;
		//fout << "line_solid " << vectorMST.at(counter).getPtA().getX() << " "	//start x
		//	<< vectorMST.at(counter).getPtA().getY() << " "						//start y
		//	<< vectorMST.at(counter).getPtB().getX() << " "						//end x
		//	<< vectorMST.at(counter).getPtB().getY() << " red" << endl;			//end y
		fout << "sleep .5" << endl;

		counter++;

	} while (vectorMST.size() <= ptVector.size() - 1);

	fin.close();

}