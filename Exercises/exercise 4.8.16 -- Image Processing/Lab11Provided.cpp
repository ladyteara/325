// compile with -std=c++11
#include <fcntl.h>
#include <cstdlib>
#include <iostream>
#include <fstream>
#include <string>
#include <vector>  // this is required in order to use vectors
using std::string;
using std::cout;
using std::cin;
using std::vector;

using namespace std;

#define DEBUG     // Surround debug output statements
#define FILESIZE 256   // Remove if not needed

///////////////////////////////////////////////////////////////////////

class PixelColor
{
    public:
		PixelColor (int r, int g, int b)
		{
			red = r; green = g; blue = b;
		}
		PixelColor ()
		{
			red = 0; green = 0; blue = 0;
		}
	
		int getR() { return red; }
		int getG() { return green; }
		int getB() { return blue; }
		void setR(int r) { red = r; }
		void setG(int g) { green = g; }
		void setB(int b) { blue = b; }
    private:
		int red = 0;
		int green = 0;
		int blue = 0;
};

///////////////////////////////////////////////////////////////////////

class Frame
{
    public:
	Frame(string filename)
	{
	    char *c = new char[1];
	    char b1;
	    char b2;
	    int dummyIntR, dummyIntG, dummyIntB;
	    ifstream myIFStream(filename, ifstream::in | ifstream::binary);
	    
	    /*
	    try
	    {
		fd_in = open(filename, O_RDONLY | O_BINARY);
	    }
	    catch (exception &e)
	    {
		cout << e.what() << endl;
		cout << "Input file " << filename << " could not be opened. " << endl;
		exit(0);
	    }
	    */
	    
	    // Read the 2-byte magic number. It should be "BM"
	    myIFStream.read(&b1, 1);  // dummy character
	    myIFStream.read(&b2, 1);  // dummy character
	    if (b1 != 'B' || b2 != 'M')
	    {
		cout << "File is not a BMP file." << endl; exit(0);
	    }
	    
	    // read and discard the next several bytes -- header information
	    for (int i = 0; i < 16; i++)
	    {
		myIFStream.read(c, 1);  // dummy character
		cout << i << "-th char read is 0x " << std::hex << (int)*c << std::dec << endl;
	    }
	    
	    // read the image width and height which are stored in 32-bit integer, LSByte first.
	    // We need to swap the bytes around.
	    // Also, the bytes read are really unsigned bytes -- but C++ will treat them as signed.
	 
	    myIFStream.read(c, 1); this->width = ((int)*c) & 0x000000ff;			// LeastSigByte of data is now in LeastSigByte of 32-bit int
	    myIFStream.read(c, 1); this->width += (((int)*c) & 0x000000ff) << 8;	// This is the 2nd-leastSigByte
	    myIFStream.read(c, 1); this->width += (((int)*c) & 0x000000ff)  << 16;  // This is the 3nd-leastSigByte
	    myIFStream.read(c, 1); this->width += (((int)*c) & 0x000000ff)  << 24;  // This is the 4nd-leastSigByte ie MostSigByte

	    myIFStream.read(c, 1); this->height = ((int)*c) & 0x000000ff;			// LeastSigByte of data is now in LeastSigByte of 32-bit int
	    myIFStream.read(c, 1); this->height += (((int)*c) & 0x000000ff) << 8;	// This is the 2nd-leastSigByte
	    myIFStream.read(c, 1); this->height += (((int)*c) & 0x000000ff)  << 16; // This is the 3nd-leastSigByte
	    myIFStream.read(c, 1); this->height += (((int)*c) & 0x000000ff)  << 24;	// This is the 4nd-leastSigByte ie MostSigByte

	    
	    cout << "  width is " << this->width << ", height is " << this->height << endl;

	    // read and discard the next several bytes -- header information
	    for (int i = 0; i < 28; i++)
	    {
		myIFStream.read(c, 1);  // dummy character
		cout << i << "-th char read is 0x " << std::hex << (int)*c << std::dec << endl;
	    }
	    
	    // The rows of data in a BMP file are stored in REVERSE order (row at bottom
	    // of image is stored first in file, etc.
	    // TBD ---- Deal with the row order!

	    for (int i = 0; i < this->height; i++)
	    {

		vector<PixelColor> tempRow;
		for (int j = 0; j < this->width; j++)
		{
		    // Pixel component data are stored in BMP file in B G R order
		    myIFStream.read(c, 1); dummyIntB = 0x000000ff & ((int)*c); // Convert properly the 8 bits in range 0..255
		    myIFStream.read(c, 1); dummyIntG = 0x000000ff & ((int)*c);
		    myIFStream.read(c, 1); dummyIntR = 0x000000ff & ((int)*c);
		    
		    PixelColor *dummyPixelColor = new PixelColor(dummyIntR, dummyIntG, dummyIntB);
		    //(thePixels.at(i)).at(j) = *dummyPixelColor; // new PixelColor(dummyIntR, dummyIntG, dummyIntB);
		    tempRow.push_back(*dummyPixelColor);  // add to the end of the row
		}  // end for c
		// thePixels.at(i)).at(j) = *dummyPixelColor; // new PixelColor(dummyIntR, dummyIntG, dummyIntB);
		thePixels.push_back(tempRow);  // new PixelColor(dummyIntR, dummyIntG, dummyIntB);

		// Each row of pixels ends on a 32-bit boundary which is padded with zeroes if needed.
		// Read and discard any zeroes used for padding.
		// System.out.println("  going to have to discard " + (4 - ((width * 3) % 4)) + " padding bytes because of width " + width);
		if (((this->width * 3) % 4) != 0)
		{
		    for (int i = 0; i < (4 - ((this->width * 3) % 4)); i++)
		    {
			myIFStream.read(c, 1);  // discard
		    }
		}
	    }  // end for r

           //System.out.println("  width and height are " + width + ", " + height);
	 
	    myIFStream.close();
	} // end Frame constructor
	///////////////////////////////////////////////////////////////////////

	// Coordinates of this shape are in the standard system with (0,0) at bottom left,
	// Y axis increases upwards. 
	void drawRect(int lowerLeftX, int lowerLeftY, int rectWidth, int rectHeight,
		      int Rcolor = 0, int Gcolor = 0, int Bcolor = 0)
	{
	    for (int row = lowerLeftY; row > lowerLeftY - rectHeight; row -= 1)  // from bottom of rect toward its top
	    {
		for (int column = lowerLeftX; column < lowerLeftX + rectWidth; column += 1) 
		{
		    // Rows of the image are maintained bottom-to-top --- invert the Y axis
		    cout << "X (column) coord is " << column << endl;
		    cout << "Y (row) coord is " << row << endl;
			    
		    this->thePixels.at(row).at(column).setR(Rcolor);
		    this->thePixels.at(row).at(column).setG(Gcolor);
		    this->thePixels.at(row).at(column).setB(Bcolor);
		    
		}

	    }
	    
	} // drawRect
	///////////////////////////////////////////////////////////////////////


	/* Draw a line of pixels with the specified color from the direction of (x1,y1)
	 * toward (x2,y2).
	 *
	 * Case 1. x1 < x2, y1 > y2 in graphic coordinates
	 * case 2. x1 < x2, y1 < y2 in graphic coordinates
	 * Case 3. x1 > x2, y1 < y2 in graphic coordinates
	 * Case 4. x1 > x2, y1 > y2 in graphic coordinates
	 */
	/* Issues with drawline: there are going to be eight cases:
	 *    four cases having to do with the relative positions of (x1,y1) to (x2,y2), so
	 *    	that drawing occurs from (x1,y1) toward (x2,y2) and stops at the correct time
	 *    each of those four cases occurs in two types: where the line is more closely
	 *    	horizontal or vertical. The issue is which axis should be the unit step -- if
	 *    	a nearly vertical line is drawn with an X unit step, there will be large gaps
	 *    	between single pixels, and the line should instead be drawn with a Y unit step.
	/*
	void drawLine(int x1, int y1, int x2, int y2, int Rcolor = 0, int Gcolor = 0, int Bcolor = 0)
	{

	    int lowX = min(x1,x2);
	    int hiX = max(x1,x2);
	    int deltaX;  // int type is OK because value is either -1 or 1
	    float deltaY; // float is needed

	    if (x1 < x2) // case 1 and 2
		deltaX = 1; // increase x on each iteration
	    else // case 3 and 4
		deltaX = -1; // decrease x on each iteration
	    
	    // deltaY is positive, will be set to negative if needed
	    deltaY = (float)(max(y1,y2) - min(y1,y2)) / (float)(max(x1,x2) - min(x1,x2)); // float is needed
	    if (y1 > y2) // case 1 and 4
		deltaY = -deltaY;  // deltaY will be negative to move toward "smaller" Y
		

	    cout << "deltaY is " << deltaY << endl;
	    for (int i = x1; ((x1 < x2) && (i < x2)) ||
			     ((x1 >= x2) && (i > x2)); i += deltaX) // X value of point changes appropriately at each iteration
	    {
		// Rows of the image are maintained bottom-to-top --- invert the Y axis
		//(this->thePixels.at(i)).at(y1 + ((i-lowX)*deltaY)).setR(Rcolor); 
		//(this->thePixels.at(i)).at(y1 + ((i-lowX)*deltaY)).setG(Gcolor);
		//(this->thePixels.at(i)).at(y1 + ((i-lowX)*deltaY)).setB(Bcolor);
		cout << "X (column) coord is " << i << endl;
		cout << "Y (row) coord is " << (height - 1 - (y1 + ((i-lowX)*deltaY))) << endl;
			    
		this->thePixels.at(height - 1 - (y1 + ((i-lowX)*deltaY))).at(i).setR(Rcolor); 
		this->thePixels.at(height - 1 - (y1 + ((i-lowX)*deltaY))).at(i).setG(Gcolor);
		this->thePixels.at(height - 1 - (y1 + ((i-lowX)*deltaY))).at(i).setB(Bcolor);

	    }
	    cout << "------------------" << endl;
	    
	} // end drawLine
	*/
	///////////////////////////////////////////////////////////////////////
	
	// Write the data to the stream as a swapped two-byte value
	void write2ByteData(ofstream *myOFStream, int data)
	{
	    char *c = new char[1];
	    *c = data & 0xff; myOFStream->write(c, 1); // LeastSigByte
	    *c = (data & 0xff00) >> 8; myOFStream->write(c, 1); // This is the 2nd-leastSigByte
	}
	///////////////////////////////////////////////////////////////////////

	// Write the data to the stream as a swapped four-byte value
	void write4ByteData(ofstream *myOFStream, int data)
	{
	    char *c = new char[1];
	    *c = data & 0xff; myOFStream->write(c, 1); // LeastSigByte
	    cout << "wrote 4-byte A   " << std::hex << (0xff & (int)*c) << std::dec << endl;
	    *c = (data & 0xff00) >> 8; myOFStream->write(c, 1);								// This is the 2nd-leastSigByte
	    cout << "wrote 4-byte B   " << std::hex << (0xff & (int)*c) << std::dec << endl;
	    *c = (data & 0xff0000) >> 16; myOFStream->write(c, 1);							// This is the 2nd-leastSigByte
	    cout << "wrote 4-byte C   " << std::hex << (0xff & (int)*c) << std::dec << endl;
	    *c = (data & 0xff000000) >> 24; myOFStream->write(c, 1);						// This is the 2nd-leastSigByte
	    cout << "wrote 4-byte D   " << std::hex << (0xff & (int)*c) << std::dec << endl;
	}
	///////////////////////////////////////////////////////////////////////
	
	// Write the pixel data of this Frame object to a BMP-format image file.
	void writeOut(string filename)
	{
	    char *c = new char[1];
	    char b1;
	    char b2;
	    int dummyIntR, dummyIntG, dummyIntB;
	    ofstream myOFStream(filename, ofstream::out | ofstream::binary);
	    
	 
	    // This data is the Bitmap file header. Some hardcoded information.
	    // Write the 2-byte magic number. It should be "BM"
	    b1 = 'B'; myOFStream.write(&b1, 1);				// dummy character
	    b2 = 'M'; myOFStream.write(&b2, 1);				// dummy character

	    int size = 	14 +								// size of Bitmap file header
			40 +										// size of BITMAPINFOHEADER header
			0 +											// TBD -- color table?
			(height *									// height
			((width * 3) + ((width * 3) % 4)));			// width including RGB and padding
	    write4ByteData(&myOFStream, size);				// write size to Bitmap file header
	    write2ByteData(&myOFStream, 0);					// write reserved to Bitmap file header
	    write2ByteData(&myOFStream, 0);					// write reserved to Bitmap file header
	    write4ByteData(&myOFStream, 54);				// write offset to Bitmap file header

	    // This data is the BITMAPINFOHEADER file header. Some hardcoded information.
	    write4ByteData(&myOFStream, 40);				// write header size to BITMAPINFOHEADER file header
	    write4ByteData(&myOFStream, width);				// write width to BITMAPINFOHEADER file header
	    write4ByteData(&myOFStream, height);			// write height to BITMAPINFOHEADER file header
	    write2ByteData(&myOFStream, 1);					// write number color planes to BITMAPINFOHEADER file header
	    write2ByteData(&myOFStream, 24);				// write bits per pixel to BITMAPINFOHEADER file header
	    write4ByteData(&myOFStream, 0);					// write compression to BITMAPINFOHEADER file header
	    write4ByteData(&myOFStream, width*height*3);	// write size of raw bitmap data to BITMAPINFOHEADER file header
	    write4ByteData(&myOFStream, 0);					// write horiz. resolution to BITMAPINFOHEADER file header
	    write4ByteData(&myOFStream, 0);					// write vert. resolution to BITMAPINFOHEADER file header
	    write4ByteData(&myOFStream, 0);					// write number colors (0 => 2^n) to BITMAPINFOHEADER file header
	    write4ByteData(&myOFStream, 0);					// write number important colors to BITMAPINFOHEADER file header

	    // This data is the Color table.
	    // "The color table is normally not used when the pixels are in the 16-bit per pixel (16bpp)
	    // format (and higher); there are normally no color table entries in those bitmap image files."
	    // ???????????
	    // Not writing out the color table nonetheless creates the ffff data at byte 54 through 521????
	    // How can that be?
	    /*
	    for (int i = 0; i < 0; i++)
	    {
		write4ByteData(&myOFStream, -1);  // write ff ff ff ff for four-byte color table entry
	    }
	    */
	    
	    
	    // The rows of data in a BMP file are stored in REVERSE order (row at bottom
	    // of image is stored first in file, etc.
	    // TBD ---- Deal with the row order!

	    for (int i = 0; i < this->height; i++)
	    {

		//vector<PixelColor> tempRow;
		for (int j = 0; j < this->width; j++)
		{
		    // Pixel component data are stored in BMP file in B G R order
		    //cout << ((this->thePixels.at(i)).at(j)).getR() << endl;

		    *c = ((this->thePixels.at(i)).at(j)).getB(); myOFStream.write(c, 1);
		    *c = ((this->thePixels.at(i)).at(j)).getG(); myOFStream.write(c, 1);
		    *c = ((this->thePixels.at(i)).at(j)).getR(); myOFStream.write(c, 1);

		    
		}  // end for c

		// Each row of pixels ends on a 32-bit boundary which is padded with zeroes if needed.
		// Read and discard any zeroes used for padding.
		// System.out.println("  going to have to discard " + (4 - ((width * 3) % 4)) + " padding bytes because of width " + width);
		*c = 0; // dummy data
		if (((this->width * 3) % 4) != 0)
		{
		    for (int i = 0; i < (4 - ((this->width * 3) % 4)); i++)
		    {
			myOFStream.write(c, 1);  // pad with dummy data
		    }
		}
	    }  // end for r

	    myOFStream.close();
	} // end writeOut
	
    

    
    private:
	// this->thePixels.at(0).at(0).setR(Rcolor);  refers to the pixel in the lower left of the
	// true image. That is the same order as standard coordinate systems  and the same order
	// that rows are stored in the BMP format (bottom to top)
	// but it is different than the typical graphics-style coordinate system with (0,0) at top
	// left and Y increasing downward.
	vector<vector<PixelColor>> thePixels;
	
	int width = 0;
	int height = 0;
}; // end Frame class


////////////////////////////////////////////////////////////////

int main(int argc, char *argv[])  // argv[1] is the first command-line argument
{

    Frame myNewImage("MarthaStewart.bmp");
    //myNewImage.drawLine(0, 0, 20, 100);
    
    // Vandalize the image

    /*
    myNewImage.drawLine(76,75,89,79);  // Martha
    myNewImage.drawLine(89,79,104,75);
    myNewImage.drawLine(64,140,74,135);  // the cat
    myNewImage.drawLine(86,140,74,135);
    */
    
    // These coordinates are in graphics system: (0,0) at top left, Y coord increases downward
        //myNewImage.drawLine(0, 0, 20, 20, 200, 0, 0);  // red.  Case 2. OK
        //myNewImage.drawLine(0, 60, 20, 40, 0, 200, 0);  // green. case 1. 
        //myNewImage.drawLine(80, 60, 40, 80, 0, 0, 200);  // blue.  Case 3. 
	/*
        myNewImage.drawLine(80, 80, 20, 20);  // black. case 4. 
        myNewImage.drawLine(0, 0, 20, 20);  // 
        myNewImage.drawLine(0, 0, 20, 20);  // 
	*/
    
    myNewImage.drawRect(10, 21, 40, 10); 
    myNewImage.drawRect(10, 41, 40, 10,  200, 0, 0); 
    myNewImage.drawRect(10, 61, 40, 10,  0, 200,0); 
    myNewImage.drawRect(10, 81, 40, 10,  0,  0, 200); 
    
    myNewImage.writeOut("output.bmp");
    
    // myNewImage.writeOut();

} // end main
