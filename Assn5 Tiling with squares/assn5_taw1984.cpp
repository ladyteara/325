/************************
Tara Walton
tara1984
Assn53 - Due 3/23/16
Instructions:	Assignment must be compiled and run from VS Studio on my machine.
************************/

#include<iostream>
#include<fstream>
#include<vector>
#include<algorithm>
#include<iomanip>

using namespace std;
class Square
{
public:
	// Constructor
	Square()
	{
		edge = 0;
		coordx = 0; coordy = 0;
	}											// end constructor

	Square(unsigned short e)
	{
		edge = e;
		coordx= 0; coordy = 0;
	}											// end constructor

	unsigned short getEdge() { return edge; }
	unsigned short getX() { return coordx; }
	unsigned short getY() { return coordy; }
	void setX(unsigned short x) { coordx = x; }
	void setY(unsigned short y) { coordy = y; }

private:
	unsigned short edge, coordx, coordy;

friend ostream& operator<<(ostream& out, Square l);
};												// end class Square

ostream& operator <<(ostream& out, Square l)
{
	cout << "OUTPUT: Square with edge " << l.edge << " has lower left (" << l.coordx << ", " << l.coordy << ")";
	return out;
}

bool sortByEdge(Square& lhs, Square& rhs)
{ return lhs.getEdge() > rhs.getEdge(); }



int main()
{
	ifstream fin;
	fin.open("C:\\Users\\Tara\\Google Drive\\_CSC325 - Algorithms\\Assn\\sampleInput.dat");
	if (!fin.is_open())
	{
		cout << "File failed to open. Please make sure it is in the correct location and you have permisson to access this file.\n";
		return 0;
	}

//READ FILE
	unsigned short width, height, num, edge;
	vector<Square> squares;
	Square dummySquare;

	fin >> width >> height >> num;
	
	for (int i = 0; i < num; i++)
	{
		fin >> edge;
		dummySquare = Square(edge);
		squares.push_back(dummySquare);
	}
	fin.close();

	sort(squares.begin(), squares.end(), sortByEdge);

//ALGORITHM
	
	//base case: if edge > bound
		//do nothing
	//

//WRITE FILE
	ofstream fout;
	fout.open("C:\\Users\\Tara\\Google Drive\\_CSC325 - Algorithms\\Assn\\Output.dat");
	if (!fout.is_open())
	{
		cout << "File failed to open. Please make sure it is in the correct location and you have permisson to access this file.\n";
		return 0;
	}


//OUTPUT Square with edge 5 has lower left (77, 33)  - in ostream overload
	//BEARPLOT RECTANGLE : rectangle topLeftX topLeftY bottomRightX bottomRightY(color)
	//		(x, y-e)	*---------* (x+e, y-e)
	//					|		  |	
	//					|		  |
	//		(x, y)		*---------* (x+e, y)
for (int j = 0; j < num; j++)
	{
	cout << squares.at(j);
	fout << "rectangle " << squares.at(j).getX() << " " << squares.at(j).getY() - squares.at(j).getEdge()
		<< " " << squares.at(j).getX() + squares.at(j).getEdge() << " " << squares.at(j).getY() << endl;
	}

	fout.close();
	return 0;
}