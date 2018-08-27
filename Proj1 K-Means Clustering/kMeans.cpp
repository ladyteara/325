/*Project 1 
Completed by Tara Walton, Brent Eaves, Matthew Addler

Build and run from Visual Studio. dataOut.txt can be run with python in the cmd window to produce graph*/

#include<iostream>
#include<iomanip>
#include<fstream>
#include<string>
#include<math.h>
#include<vector>
#include<ctime>
#include<algorithm>

using namespace std;
ofstream fout;

class Point
{
public:
	// Constructor. Any setup operation you wish for the class.
	Point()
	{
		x = 0; y = 0;
	}											// end constructor
	Point(float a, float b, string id)
	{
		x = a; y = b; pointID = id;
	}											// end constructor

	float getX()		{ return x; }
	float getY()		{ return y; }
	string getID()		{ return pointID; }

	void setX(float a)	{ x = a; }
	void setY(float a)	{ y = a; }

private:
	float x = 0;
	float y = 0;
	string pointID = "";

	friend ostream& operator<<(ostream& out, Point l);
};												// end class Point

//--------------------------------------------------------------------------
class Edge
{
public:
	Edge() {}									// end constructor
	Edge(Point ptA, Point ptB)
	{
		state = ptA;		centroid = ptB;
		dist = sqrt(pow(abs(state.getX() - centroid.getX()), 2) + pow(abs(state.getY() - centroid.getY()), 2));
	}											// end constructor

	Point getPtA()			{ return state; }
	Point getPtB()			{ return centroid; }
	float getDist()			{ return dist; }
	string getStateID()		{ return state.getID(); }
	string getCentroidID()	{ return centroid.getID(); }

private:
	Point state;
	Point centroid;
	float dist;

	friend ostream& operator<<(ostream& out, Edge l);
};												// end class Edge

//--------------------------------------------------------------------------
ostream& operator <<(ostream& out, Point l)
{
	cout << setw(2) << l.getID() << " " << setw(5) << l.getX() << " " << setw(6) << l.getY() << endl;
	//point x y (color)
	fout << "circle " << l.getX() - 1 << " " << l.getY() - 1 << " 5 ";
	if (l.getID().size() == 2)
		fout << "blue" << endl;
	else
		fout << "red" << endl;
	//text pointX pointY fontsize word1
	fout << "text " << l.getX() - 2 << " " << l.getY() - 2 << " 9 " << l.getID() << endl;
	return out;
}

ostream& operator <<(ostream& out, Edge l)
{
	cout << l.getStateID() << " " << l.getCentroidID() << " " << l.getDist() << endl;
	//line startX startY endX endY (optional color, default is black)
	fout << "line " << l.getPtA().getX() << " " << l.getPtA().getY() << " " << l.getPtB().getX() << " " << l.getPtB().getY() << " grey40" << endl;
	return out;
}

bool sortByDist(Edge& lhs, Edge& rhs)
{ return lhs.getDist() < rhs.getDist(); }

float meanX(vector<Edge> vect)
{
	float sum = 0;
	for (Edge v : vect)
	{
		sum += v.getPtA().getX();
		return sum / vect.size();
	}
}

float meanY(vector<Edge> vect)
{
	float sum = 0;
	for (Edge v : vect)
	{
		sum += v.getPtA().getY();
		return sum / vect.size();
	}
}

int kMeans(vector<Point>& states, vector<Point>& centroids)
{
	vector<Edge> keepers;			//shortest edges from state to centroid
	for (Point state : states)
	{
		vector<Edge> distances;
		for (Point centroid : centroids)
		{
			Edge dummy = Edge(state, centroid);
			distances.push_back(dummy);
		}
		sort(distances.begin(), distances.end(), sortByDist);
		keepers.push_back(distances.at(0));		//keep the edge to the nearest centroid
	}
	for (int i = 0; i < keepers.size(); i++)
	{
		cout << keepers.at(i);
	}
	
	//sort into clusters (one vector for each centroid)
	vector<vector<Edge>> cents;
	for (Edge pt : keepers)
	{
		for (int i = 0; i < centroids.size(); i++)   //!
		{
			if (pt.getPtB().getID() == to_string(i))
				cents.at(i).push_back(pt);
		}
	}
	
	//recalculate centroids - exit if no change  //!NOT CALLING A SECOND TIME
	for (int i = 0; i < cents.size(); i++)
	{
		float x = meanX(cents.at(i));					float y = meanY(cents.at(i));
		if ((centroids.at(i).getX() == x) && (centroids.at(i).getY() == y))
		{
			return 0;
		}
		centroids.at(i).setX(meanX(cents.at(i)));		centroids.at(i).setY(meanY(cents.at(i)));
		
		
		kMeans(states, centroids);  
	}
	
}


int main()
{
	string location="C:\\Users\\Tara\\Google Drive\\_CSC325 - Algorithms\\Proj1 K-Means Clustering", file="data.txt";
	ifstream fin;
	fin.open(location + "\\" + file);
	if (!fin.is_open())
	{
		cout << "File failed to open. Please make sure you have permisson to write to this location.\n";
		return 0;
	}
	fout.open(location + "\\dataOut.txt");
	if (!fout.is_open())
	{
		cout << "File failed to open. Please make sure you have permisson to write to this location.\n";
		return 0;
	}
	string state;
	float x, y;
	vector<Point> states;
	Point dummy;
	//Reading points from file
	while (fin >> state)
	{
		fin >> x >> y;
		dummy = Point(x, y, state);
		states.push_back(dummy);
	}
	
	//Random calculations of centroids
	srand(time(0));
	vector<Point> centroid;
	short n = 3;									///CHANGE ME FOR MORE CENTROIDS?
	cout << "How many centroids? :"; cin >> n;
	for (int i = 0; i < n; i++)
	{
		int x = rand() % 500;
		int y = rand() % 500;
		
		dummy = Point(x, y, to_string(i));
		centroid.push_back(dummy);
	}

	fout << 500 << " " << 450 << " peachPuff" << endl;
	//display and draw each state and centroid
	for (int i = 0; i<states.size(); i++)
	{
		cout << states.at(i);
	}
	for (int i = 0; i < centroid.size(); i++)
	{
		cout << centroid.at(i);
	}


	kMeans(states, centroid);

	fin.close();
	fout.close();
	return 0;
}