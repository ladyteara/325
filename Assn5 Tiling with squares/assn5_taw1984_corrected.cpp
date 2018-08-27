/************************
Tara Walton
tara1984
Assn5 - Due 3/23/16
Instructions:	Assignment must be compiled and run from VS Studio.

Fully functional- Woohoo!
************************/

#include<algorithm>
#include<fstream>
#include<iomanip>
#include<iostream>
#include<vector>
#include<string>

using namespace std;

ofstream fout;

class Square
{
public:
	// Constructor
	Square()
	{
		width = 0;		height = 0;
		coordX = 0;		coordY = 0;
		topLeftX = 0;	topLeftY = 0;
		btmRtX = 0;		btmRtY = 0;
	}											// end constructor
	
	Square(short w, short h, short x, short y)
	{
		/*		(x, y-h)	*---------* (x+w, y-h)
							|		  |	
							|		  |
				(x, y)		*---------* (x+w, y)		*/
		width = w;		height = h;
		coordX = x;		coordY = y;
		topLeftX = coordX;
		topLeftY = coordY - h;
		btmRtX = coordX + w;
		btmRtY = coordY;
	}
	
	void setX(short x) { coordX = x; 
	topLeftX = coordX;
	btmRtX = coordX + width;
	}
	void setY(short y) { coordY = y; 
	topLeftY = coordY - height;
	btmRtY = coordY;
	}

	short getHeight()	{	return height;	}
	short getWidth()	{	return width;	}
	short getX()		{	return coordX;	}
	short getY()		{	return coordY;	}
	short getTX()		{	return topLeftX; }
	short getTY()		{	return topLeftY; }
	short getBX()		{	return btmRtX;	}
	short getBY()		{	return btmRtY;	}

private:
	//BEARPLOT RECTANGLE : rectangle topLeftX topLeftY bottomRightX bottomRightY (color)
	short width, height, topLeftX, topLeftY, btmRtX, btmRtY, coordX, coordY;

friend ostream& operator<<(ostream& out, Square l);
//friend int insertBox(Square x, vector<Square>& l);
};												// end class Square

ostream& operator <<(ostream& out, Square l)
{
	//OUTPUT Square with edge 5 has lower left (77, 33)
	cout << "OUTPUT: Square with edge " << setw(2) << l.getWidth() << " has lower left ("
		 << setw(2) << l.getX() << ", " << setw(2) << l.getY() << ")";
	return out;
}

bool sortByEdge(Square& lhs, Square& rhs)
{ return lhs.getWidth() > rhs.getWidth(); }

	//ALGORITHM
int insertBox(Square boundingBox, vector<Square>& tiles, string tab, int depth)
{
	if ((boundingBox.getHeight() == 0) || (boundingBox.getWidth() == 0))	//base case - no bounding box
	{
		return 0;
	}
	

	//find largest that fits in box size
	for (int i = 0; i < tiles.size(); i++)
	{
		
		if ((tiles.at(i).getWidth() <= boundingBox.getWidth()) && (tiles.at(i).getHeight() <= boundingBox.getHeight()))
		{
			tiles.at(i).setX(boundingBox.getX());
			tiles.at(i).setY(boundingBox.getY());

			float pointX = 5 * (tiles.at(i).getTX() + tiles.at(i).getBX()) / 2, pointY = 5 * (tiles.at(i).getTY() + tiles.at(i).getBY()) / 2;
			int BBTX = boundingBox.getTX(), BBTY = boundingBox.getTY(), BBx = boundingBox.getX(), BBy = boundingBox.getY();
			int width = tiles.at(i).getWidth(), height = tiles.at(i).getHeight();

			cout << tiles.at(i) /*<< tab << depth */ << endl;
			/*Placed tile*/
			//BEARPLOT RECTANGLE :	rectangle topLeftX topLeftY bottomRightX bottomRightY (color)
			fout << "rectangle " << tiles.at(i).getTX() * 5 << " " << tiles.at(i).getTY() * 5
						  << " " << tiles.at(i).getBX() * 5 << " " << tiles.at(i).getBY() * 5 << " mediumpurple2" << endl;


			tiles.erase(tiles.begin() + i);
			//BEARPLT TEXT:			text pointX pointY fontsize word1

			fout << "text " << pointX << " " << pointY << " " << 10 << " " << width << endl;
			/*					*---------*---------*
								|		  |			|
								|		  |	(x+w, y-h)
					(x, y-h)	*---------*---------*
								|		  |			|
								|		  |			|
					(x, y)		*---------*---------*	(Bx, By)
								(x+w, By)							*/

			//Square(w, h, x, y)  

			Square UL = Square(width,							boundingBox.getHeight() - height,	BBx,			BBy - height);
			Square UR = Square(boundingBox.getWidth() - width,	boundingBox.getHeight() - height,	BBx + width,	BBy - height);
			Square BR = Square(boundingBox.getWidth() - width,	height,								BBx + width,	BBy);
			/*Draw bounding boxes*/
			fout << "rectangle " << UL.getTX() * 5 << " " << UL.getTY() * 5 << " " << UL.getBX() * 5 << " " << UL.getBY() * 5 << endl;
			fout << "rectangle " << UR.getTX() * 5 << " " << UR.getTY() * 5 << " " << UR.getBX() * 5 << " " << UR.getBY() * 5 << endl;
			fout << "rectangle " << BR.getTX() * 5 << " " << BR.getTY() * 5 << " " << BR.getBX() * 5 << " " << BR.getBY() * 5 << endl;
			fout << "sleep 2" << endl;

			insertBox(UL, tiles, tab + "  ", depth++);
			insertBox(UR, tiles, tab + "  ", depth++);
			insertBox(BR, tiles, tab + "  ", depth++);
			break;
		}
	}
}


int main()
{
	ifstream fin;
	fin.open("C:\\temp\\Assn5\\sampleInput.dat");
	if (!fin.is_open())
	{
		cout << "File failed to open. Please make sure it is in the correct location and you have permisson to access this file.\n";
		return 0;
	}

//READ FILE
	short width, height, num, edge;
	vector<Square> squares;
	Square dummySquare;

	fin >> width >> height >> num;
	for (int i = 0; i < num; i++)
	{
		fin >> edge;
		dummySquare = Square(edge, edge, 0, height);
		squares.push_back(dummySquare);
	}
	fin.close();

	sort(squares.begin(), squares.end(), sortByEdge);


//WRITE FILE
	fout.open("C:\\temp\\Assn5\\Output.dat");
	if (!fout.is_open())
	{
		cout << "File failed to open. Please make sure it is in the correct location and you have permisson to access this file.\n";
		return 0;
	}

	//ALGORITHM
	Square boundingBox = Square(width, height, 0, height);

	cout << width * 5 << " " << height * 5 << " lightgray" << endl;
	fout << width * 5 << " " << height * 5 << " lightgray" << endl;
	int depth = 0; string tab = "\t";
	insertBox(boundingBox, squares, tab, depth);

	fout.close();
	return 0;
} 