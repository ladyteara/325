// Original red-black tree code  https://www.cs.auckland.ac.nz/~jmor159/PLDS210/niemann/s_rbt.htm
// Adapted Ken Vollmar, Apr. 2016

/* 
The original Red-Black code uses the term NIL in a different
manner than the NULL is typically used in C++. 
NIL is the special indicator for 
leaf nodes in the RB tree (refer to "Algorithms" by Cormen).
*/


//#include <stdio.h>
//#include <stdlib.h>
//#include <string.h>
//#include <stdarg.h>
#include <cstdlib>
#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <cstring>
#include <ctime>  // time function
#include <algorithm>    // std::max
#include <math.h>       // log2 
//using std::istream; using std::ostream;
using namespace std;

typedef int T;                  /* type of item to be stored */
#define compLT(a,b) (a < b)
#define compEQ(a,b) (a == b)

/* Red-Black tree description */
typedef enum { BLACK, RED } nodeColor;

typedef struct Node_ {
    struct Node_ *left;         /* left child */
    struct Node_ *right;        /* right child */
    struct Node_ *parent;       /* parent */
    nodeColor color;            /* node color (BLACK, RED) */
    T data;                     /* data stored in node */
} Node;

// See note above on the distinction between NIL and NULL
#define NIL &sentinel           /* all leafs are sentinels */
Node sentinel = { NIL, NIL, 0, BLACK, 0};

// Don't use global variable root
// Node *root = NULL;               /* root of Red-Black tree */




///////////////////////////////////////////////////////////////////////
// Maximum depth of tree. This is the maximum number of
// nodes from (including) the root to the furthest leaf.
// That value is one greater than the number of edges 
// from the root to the furthest leaf.
int treeDepth(Node *current)     
{
    if (current == NIL) return 0;
	return 1 + max(	treeDepth(current->left),
					treeDepth(current->right) );
}


///////////////////////////////////////////////////////////////////////
int numOfNodes(Node *current)     // number of nodes in tree
{
    if (current == NIL) return 0;
	return 1 + numOfNodes(current->left) + 
		numOfNodes(current->right);
}

///////////////////////////////////////////////////////////////////////
void printTreeOfNodes(Node *current)    
{
    if (current == NIL) return;
	printTreeOfNodes(current->left);

	cout << "  This node is at address " << current << endl;
	if (current->left == &sentinel)
		cout << "Left:  NIL"  << endl;
	else cout << "Left:  " << current->left << endl;
	if (current->right == &sentinel)
		cout << "right:  NIL"  << endl;
	else cout << "right:  " << current->right << endl;
    cout << "Parent: " << current->parent << endl;
    cout << "color: " << (current->color == BLACK ? "BLACK" : "RED") << endl;
    cout << "data: " << current->data << endl;
	cout << endl;

	printTreeOfNodes(current->right);    

}

///////////////////////////////////////////////////////////////////////
void printTree(Node *current)     // print tree of nodes and data
{
    if (current == NIL) return;
	printTree(current->left);
	std::cout << " " << current->data;
	printTree(current->right);
}

///////////////////////////////////////////////////////////////////////
void printTree(Node *current, int treeLevel)     // print tree of nodes and data
{

	// Print the tree in a rough binary tree shape
	cout << current->data;
	if (current->right != NIL)
	{
		cout << "-----";
		printTree(current->right, treeLevel+1);
	}
	if (current->left != NIL)
	{
		for (int kvLine = 0; kvLine < 3; kvLine++)
		{
			for (int kvSpace = 0; kvSpace < treeLevel; kvSpace++)
			{
				cout << "      ";
			}
			cout << "|" << endl;
		}
		for (int kvSpace = 0; kvSpace < treeLevel; kvSpace++)
		{
			cout << "      ";
		}
		printTree(current->left, treeLevel+1);
	}
	
	
    return;
}


///////////////////////////////////////////////////////////////////////
// The parameter is a REFERENCE to a POINTER. 
// Changes made to the pointer parameter will be 
// preserved outside the function (returned as a 
// side effect to the function).
void rotateLeft(Node *&root, Node *x)    // rotate node x to left *
{

    Node *y = x->right;  // CLRS p. 313, line 1

	/*
	cout << "rotateLeft: starting, root data is " << root->data << endl;
	cout << "rotateLeft: starting, x data is " << x->data << endl;
	cout << "rotateLeft: starting, tree is \n";
	printTree(root, 0);
	cout << endl;
	cout << endl;
	cout << endl;
	
	printTreeOfNodes(root); 
	*/
	
	
    /* establish x->right link */
    x->right = y->left; // CLRS "Left-Rotate()", line 2
    if (y->left != NIL) y->left->parent = x;  // CLRS "Left-Rotate()", line 3-4

    /* establish y->parent link */
    if (y != NIL) y->parent = x->parent;  // CLRS "Left-Rotate()", line 5
    if (x->parent) {
        if (x == x->parent->left)  // CLRS "Left-Rotate()", line 8
            x->parent->left = y;  // CLRS "Left-Rotate()", line 9
        else
            x->parent->right = y;  // CLRS "Left-Rotate()", line 10
    } else {
        root = y; // CLRS "Left-Rotate()", line 7
    }

    /* link x and y */
    y->left = x;  // CLRS "Left-Rotate()", line 11
    if (x != NIL) x->parent = y;

	/*
	cout << "rotateLeft: ending, tree is \n";
	printTree(root, 0);
	cout << endl;
	cout << endl;
	cout << endl;
	
	printTreeOfNodes(root); 
	*/
	
} // end rotateLeft

///////////////////////////////////////////////////////////////////////
// The parameter is a REFERENCE to a POINTER. 
// Changes made to the pointer parameter will be 
// preserved outside the function (returned as a 
// side effect to the function).
void rotateRight(Node *&root, Node *x)   // rotate node x to right 
{

    Node *y = x->left;

    /* establish x->left link */
    x->left = y->right;
    if (y->right != NIL) y->right->parent = x;

    /* establish y->parent link */
    if (y != NIL) y->parent = x->parent;
    if (x->parent) {
        if (x == x->parent->right)
            x->parent->right = y;
        else
            x->parent->left = y;
    } else {
        root = y;
    }

    /* link x and y */
    y->right = x;
    if (x != NIL) x->parent = y;

} // end rotateRight

///////////////////////////////////////////////////////////////////////
// The parameter is a REFERENCE to a POINTER. 
// Changes made to the pointer parameter will be 
// preserved outside the function (returned as a 
// side effect to the function).
void insertFixup(Node *&root, Node *x) 
{

   // maintain Red-Black tree balance after inserting node x 

    /* check Red-Black properties */
    while (x != root && x->parent->color == RED) 
	{
        /* we have a violation */
        if (x->parent == x->parent->parent->left) 
		{
            Node *y = x->parent->parent->right;
            if (y->color == RED) 
			{

                /* uncle is RED */
                x->parent->color = BLACK;
                y->color = BLACK;
                x->parent->parent->color = RED;
                x = x->parent->parent;
            } else 
			{

                /* uncle is BLACK */
                if (x == x->parent->right) {
                    /* make x a left child */
                    x = x->parent;
                    rotateLeft(root, x);
                }

                /* recolor and rotate */
                x->parent->color = BLACK;
                x->parent->parent->color = RED;
                rotateRight(root, x->parent->parent);
            }
        } else 
		{

            /* mirror image of above code */
            Node *y = x->parent->parent->left;
            if (y->color == RED) 
			{

                /* uncle is RED */
                x->parent->color = BLACK;
                y->color = BLACK;
                x->parent->parent->color = RED;
                x = x->parent->parent;
            } else 
			{

                /* uncle is BLACK */
                if (x == x->parent->left) {
                    x = x->parent;
                    rotateRight(root, x);
                }
                x->parent->color = BLACK;
                x->parent->parent->color = RED;
                rotateLeft(root, x->parent->parent);
            }
        }
    } // end while
    root->color = BLACK;  
} // end insertFixup()

///////////////////////////////////////////////////////////////////////
// Allocate node for data and insert in tree
// The return value is the new node in the tree.  
// The parameter is a REFERENCE to a POINTER. 
// Changes made to the pointer parameter will be 
// preserved outside the function (returned as a 
// side effect to the function).
Node *insertNode(Node *&root, T data) 
{
    Node *current, *parent, *newNode;
	
	/*
	cout << "insertNode: starting with data " << data << endl;
	if (root == NIL)
	{
		cout << "insertNode: starting with a NIL root " << endl;
	}
	else
	{
		cout << "insertNode: starting with root " << root  << endl;
	}
	*/

    /* find where node belongs */
    current = root;
    parent = 0;  // Value of 0 here is not the same as NIL
    while (current != NIL) // NIL is the indicator at a leaf 
	{

		//cout << "insertNode: looping with current data " << current->data  << endl;

		// if data is already in the tree, return existing Node
		// (do not insert multiple copies of data into tree)
        if (compEQ(data, current->data)) 
		{
			return (current);
		}
		
		// Update parent and current pointers for next iteration
        parent = current; 
        current = compLT(data, current->data) ?
            current->left : current->right;
    }

    // setup new node
    try  // All lines within this block are part of the same exception handler
    {
		// Allocate a block of memory whose size is that of Node object.
		// malloc returns an address (that is, pointer) to that block of memory.
		// Cast that address to a pointer to a Node object.
        newNode = (Node *)malloc (sizeof(Node));  // Allocate one Node object

	} 
    catch (std::exception& ex) 
    {
        std::cout << ex.what();  // display standard explanation of the exception
        exit(0);  // exit the program
    }
	
	
    newNode->data = data;
    newNode->parent = parent;
    newNode->left = NIL;
    newNode->right = NIL;
    newNode->color = RED;
	
	//cout << "Created a new node with value " << newNode->data << endl;

    /* insert node in tree */
    if (parent)   // This node has a parent in the tree
	{
        if(compLT(data, parent->data))
            parent->left = newNode;
        else
            parent->right = newNode;
    }
	else  // This node has no parent, so this node is the root
	{
        root = newNode;
    }

	/*
	cout << "In insertNode( ) prior to insertFixup()" << endl;
	printTree(root, 0);
	cout << endl;
	cout << endl;
	cout << endl;
	cout << endl;
	*/

	
    insertFixup(root, newNode);
	
	/*
	cout << "In insertNode( ) after insertFixup()" << endl;
	printTree(root, 0);
	cout << endl;
	cout << endl;
	cout << endl;
	cout << endl;
	cout << endl;

	if (root == NIL)
	{
		cout << "insertNode: ending with a NIL root " << endl;
	}
	else
	{
		cout << "insertNode: ending with root of data " << root  << endl;
	}
	*/
	
    return(newNode);
	
} // end insertNode( )

///////////////////////////////////////////////////////////////////////
// maintain Red-Black tree balance after deleting node x 
// The parameter is a REFERENCE to a POINTER. 
// Changes made to the pointer parameter will be 
// preserved outside the function (returned as a 
// side effect to the function).
void deleteFixup(Node *&root, Node *x) 
{

    while (x != root && x->color == BLACK) {
        if (x == x->parent->left) {
            Node *w = x->parent->right;
            if (w->color == RED) {
                w->color = BLACK;
                x->parent->color = RED;
                rotateLeft (root, x->parent);
                w = x->parent->right;
            }
            if (w->left->color == BLACK && w->right->color == BLACK) {
                w->color = RED;
                x = x->parent;
            } else {
                if (w->right->color == BLACK) {
                    w->left->color = BLACK;
                    w->color = RED;
                    rotateRight (root, w);
                    w = x->parent->right;
                }
                w->color = x->parent->color;
                x->parent->color = BLACK;
                w->right->color = BLACK;
                rotateLeft (root, x->parent);
                x = root;
            }
        } else {
            Node *w = x->parent->left;
            if (w->color == RED) {
                w->color = BLACK;
                x->parent->color = RED;
                rotateRight (root, x->parent);
                w = x->parent->left;
            }
            if (w->right->color == BLACK && w->left->color == BLACK) {
                w->color = RED;
                x = x->parent;
            } else {
                if (w->left->color == BLACK) {
                    w->right->color = BLACK;
                    w->color = RED;
                    rotateLeft (root, w);
                    w = x->parent->left;
                }
                w->color = x->parent->color;
                x->parent->color = BLACK;
                w->left->color = BLACK;
                rotateRight (root, x->parent);
                x = root;
            }
        }
    }
    x->color = BLACK;
} // deleteFixup

///////////////////////////////////////////////////////////////////////
// Delete node z from tree
// The parameter is a REFERENCE to a POINTER. 
// Changes made to the pointer parameter will be 
// preserved outside the function (returned as a 
// side effect to the function).
void deleteNode(Node *&root, Node *z) 
{
    Node *x, *y;

    if (!z || z == NIL) return;


    if (z->left == NIL || z->right == NIL) {
        /* y has a NIL node as a child */
        y = z;
    } else {
        /* find tree successor with a NIL node as a child */
        y = z->right;
        while (y->left != NIL) y = y->left;
    }

    /* x is y's only child */
    if (y->left != NIL)
        x = y->left;
    else
        x = y->right;

    /* remove y from the parent chain */
    x->parent = y->parent;
    if (y->parent)
        if (y == y->parent->left)
            y->parent->left = x;
        else
            y->parent->right = x;
    else
        root = x;

    if (y != z) z->data = y->data;


    if (y->color == BLACK)
        deleteFixup (root, x);

    free (y);
} // deleteNode

///////////////////////////////////////////////////////////////////////
// Find node containing data and return a pointer to that data
Node *findNode(Node *root, T data)     
{
    Node *current = root;
    while(current != NIL)
	{
        if(compEQ(data, current->data))
            return (current);
        else
            current = compLT (data, current->data) ?
                current->left : current->right;
    }
	
	return(NULL);  // Data not found in tree. Original: return(0)
} // end findNode()


///////////////////////////////////////////////////////////////////////
int main(int argc, char **argv) 
{
    unsigned int dummyData;
	int NtoSort;  // Number of elements to be sorted
	int dataCount;
	clock_t begin, end;
	double CPU_clockticks;
	unsigned int currentRandNum;
	
		
    // Check the number of arguments. 
	// Expected: Number of integers to sort
    if (argc != 2)  // This check is often hardcoded
    {   // If failure in parameters, offer advice for correction
        cout << "\nThis program uses command-line argument.\n";
        cout << "Usage: a.exe    <Number of integers to sort>  \n";
        exit(0);
    }
	
    try  // All lines within this block are part of the same exception handler
    {
		NtoSort = (int) (stoi(argv[1]));
    } 
    catch (exception& ex) 
    {
        cout << ex.what();  // display standard explanation of the exception
        exit(0);  // exit the program
    }
	


	
	/* This code implements a "Monolithic" sort of all N elements in a single RB tree
	*/
	Node *rootMonolithic = NIL;


	cout << "NtoSort is " << NtoSort << endl << endl;
	

	/*
	Random number generation example from
	https://www.guyrutenberg.com/2014/05/03/c-mt19937-example/
	*/
	// mt19937 mt_rand(time(0));    // seed based on system time
	mt19937 mt_rand( 0 );   // seed based on hardcoded constant
	// Now calls to mt_rand() will return a random 32-bit unsigned int.
	
	// Just prior to time-critical section, initialize CPU clock timer
	begin = clock();
	

	// Generate and sort the user-selected number of random integers
    for (dataCount = 0; dataCount < NtoSort; dataCount++) 
	{
			
		// Random integer value to be sorted
		dummyData = mt_rand(); 
		
		// TBD --- This is a policy implementation: any data
		// value is inserted ONLY ONCE in the tree. Other 
		// instances of that value are not re-inserted.
				 
		// if the data is NOT found in the tree already...
		if ((findNode(rootMonolithic, dummyData)) == NULL)  
		{
			// ... put the value in the tree					
			// This root parameter is "call by reference"
            insertNode(rootMonolithic, dummyData);
        }
		
		// Put the value in the tree. 
		insertNode(rootMonolithic, dummyData);	
		
    }
	
	
	// Just after time-critical section, stop the CPU clock timer
	end = clock();
	CPU_clockticks = double(end - begin);  // There are CLOCKS_PER_SEC ticks per second
	cout << "Monolithic Sort of " << NtoSort << " elements took " << CPU_clockticks << " CPU_clockticks." << endl;

	
	// print the number of nodes in the tree
	cout << "Number of nodes in the Monolithic tree: " << numOfNodes(rootMonolithic) << endl;

	
	// print the max depth of any node in the tree
	// "Depth of tree" and "height of tree" are the same thing
	cout << "Max depth of Monolithic tree: " << treeDepth(rootMonolithic);
	cout << " vertices, inclusive, from root to furthest leaf." << endl;

	// print the entire tree
	// printTree(rootMonolithic);

		
	// End of Monolithic sort
	
	
	
}

