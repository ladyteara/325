This script requires Python3 and tkinter to run. The first line MUST have two parameters with an optional third. The first two are the Width and 
Height of the canvas to be drawn on, and the optional third is the background color. For best results a canvas size of at least 700x700 is recomended, 
although not required.

Under the canvas is information about the file being processed, Total lines in the file, current line being drawn, and a progress bar that fills up to 100%. 

Currently there is very little error checking and protection. Use at your own risk.


All coordinate parameters must be integers.
===========================COMMANDS=========================

-------------

CIRCLE:
    Draws a circle, with coordinate bounding box, with top left and diameter given as parameters. 
	Optional fill color, default is transparent

    USAGE:
        circle topLeftX topLeftY diameter (color)
-------------

COMMENT:
	Allows comments to be placed in data file. No Processing done on comments.
	
	USAGE:
		comment end of first data set
-------------

COORDINATE PLANE:
    Draws a basic coordinate plane, spliting the canvas into four equal halves. No extra settings.

	USAGE:
    	coordinate_plane
-------------

DOTTED LINE:
	Draws a dotted line from startx starty to endx endy with an optional color as parameter 6.
	
	USAGE:
		line_dotted startx starty endx endy (color)
-------------
		
LINE:
    Draws a line from startx and starty to endx and endy with an optional color option

    USAGE:
        line startx starty endx endy (optional color, defalut is black)
-------------

OVAL:
    Draws an oval, with coordinates as a bounding box, with top left and bottom right given as parameters. Optional fill color, default is transparent

    USAGE:
        oval topLeftX topLeftY bottomLeftX bottomLeftY (color)
-------------

POINT:
    Draws a one pixel point at point x y. With an optional color.

    USAGE:
        point x y (color)
-------------
        
POSITIVE COORDINATE PLANE:
    Draws a basic positive coordinate plane, with the axis 2 pixels from the edge. No extra settings.

	USAGE:
    	positive_coordinate_plane
-------------
    	
RECTANGLE:
	Draws a rectangle between two points, top left and bottom right, with optional fill color. Default color is transparent.
	
	USAGE:
		rectangle topx topy bottomx bottomy (color)
-------------
		
SLEEP:
    Pauses execution of program. Optional input in seconds as float. Default is 2

    USAGE:
        sleep (seconds)
-------------
        
TEXT:
	Draws text, centered on point given, numeric font size. Anything on remainder of line will be displayed.
	
	USAGE:
		text pointx pointy fontsize Hello World!
-------------
		
THICK LINE:
	Draws a thicker line from startx starty to endx endy with an optional color.
	
	USAGE:
		line_solid startx starty endx endy (color)
-------------
		
TRIANGLE:
	Draws three lines forming a triangle between three points, optional line color. Default is black
	
	USAGE:
		triangle point1x point1y point2x point2y point3x point3y (color)

