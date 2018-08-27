// https://gist.github.com/windoro/1c8e458e9ab5e8e4c5bb
#include <iostream>
#include <string>  // 2016-Mar-30 Ken Vollmar for string type of node
#include <cstdlib>
#include <iostream>
#include <fstream>

using namespace std;

int const RED = 1;
int const BLACK = 2;

template <typename KEY, typename VALUE>
class RedBlackTree {
public:
    struct Node{
        KEY key;
        VALUE value;
        Node *left, *right, *parent;
        int color;
        
        Node (KEY k, VALUE v){
            key = k;
            value = v;
            left = right = parent = NULL;
            color = RED;
        }
        
        Node (){
            left = right = parent = NULL;
            color = BLACK;
        }
        
    } *root, *x, *y, *now;
    
    Node *NIL;
    
    RedBlackTree (){
        NIL = new Node();
        root = NIL;
    }
    
    ~RedBlackTree(){
        clear();
        delete (NIL);
    }
    
    void insert (KEY key, VALUE value){
        now = new Node (key, value);
        now->left = now->right = now->parent = NIL;
        
        x = root;
        y = NIL;
        
        while (x!=NIL){
            y = x;
            if (now->key < x->key){
                x = x->left;
            }
            else if (now->key > x->key) {
                x = x->right;
            }
            else{
                x->value = value;
                return ;
            }
        }
        
        if (y==NIL){
            root = now;
        }
        else if (now->key <  y->key){
            y->left = now;
        }
        else{
            y->right = now;
        }
        
        now->parent = y;
        
        insert_fix(now);
    }
    
    void print (){
        print (root, 0, 0, 800);
        cout<<endl;
    }
    
    void print (Node *n, int depth, int left, int right)
	{
		/*
        if (n == NIL)return;
        print (n->left);
        cout << "Key: " << n->key << "    Value: " << n->value;
		if (n->color == RED) 
			cout << "   Color: Red" << endl;
		else
			cout << "   Color: Black" << endl;
        print (n->right);
		*/
		
		if (n == NIL) return;
        print (n->left, depth+1, left, (left+right)/2);
		cout << "circle " << ((left+right)/2) << " " << (depth*20) << " 10 ";  // coordinate of node for this tree depth
		if (n->color == RED)
		{
			cout << " red" << endl;
		}
		else
		{
			cout << " black" << endl;
		}
        print (n->right, depth+1, (left+right)/2, right);
			
    }
    
    void clear(){
        clear(root);
        root = NIL;
    }
    
    void clear (Node *n){
        if (n == NIL)return;
        clear (n->left);
        clear (n->right);
        delete (n);
    }
    
    Node* search (KEY key){
        x = root;
        
        while (x!=NIL){
            if (key < x->key){
                x = x->left;
            }
            else if (key > x->key){
                x = x->right;
            }
            else break;
        }
        
        return x;
    }
    
    void left_rotate(Node *x){
        //make y
        y = x->right;
        
        //connect x->right to b
        x->right = y->left;
        if (x->right!=NIL){
            x->right->parent = x;
        }
        
        //connect y to parent's x
        y->parent = x->parent;
        if (x->parent == NIL){
            root = y;
        }
        else if (x->parent->left == x){
            x->parent->left = y;
        }
        else{
            x->parent->right = y;
        }
        
        //connect y to x
        y->left = x;
        x->parent = y;
    }
    
    // copy from left_rotate but change x to y, left to right and vice versa
    void right_rotate(Node *y){
        x = y->left;
        
        y->left = x->right;
        if (y->left!=NIL){
            y->left->parent = y;
        }
        
        x->parent = y->parent;
        if (y->parent == NIL){
            root = x;
        }
        else if (y->parent->left == y){
            y->parent->left = x;
        }
        else{
            y->parent->right = x;
        }
        
        x->right = y;
        y->parent = x;
    }
    
    void insert_fix(Node *x){
        while (x->parent->color == RED){
            if (x->parent->parent->left == x->parent){
                y = x->parent->parent->right;
                if (y->color == RED){
                    y->color = BLACK;
                    x->parent->color = BLACK;
                    x->parent->parent->color = RED;
                    x = x->parent->parent;
                }else{
                    if (x->parent->right == x){
                        x = x->parent;
                        left_rotate(x);
                    }
                    x->parent->color = BLACK;
                    x->parent->parent->color = RED;
                    right_rotate(x->parent->parent);
                }
            }
            else{
                y = x->parent->parent->left;
                if (y->color == RED){
                    y->color = BLACK;
                    x->parent->color = BLACK;
                    x->parent->parent->color = RED;
                    x = x->parent->parent;
                }else{
                    if (x->parent->left == x){
                        x = x->parent;
                        right_rotate(x);
                    }
                    x->parent->color = BLACK;
                    x->parent->parent->color = RED;
                    left_rotate(x->parent->parent);
                }
            }
        }
        root->color = BLACK;
    }
    
    int depth(){
        return depth(root);
    }
    
    int depth (Node *n){
        if (n==NIL)return 0;
        return 1 + max(depth(n->left), depth(n->right));
    }
};

// Pass arguments or parameters from command-line execution. argc is the count of
// those parameters, including the executable filename. argv[] is an array of the 
// parameters.
int main (int argc, char *argv[])
{
    string token;
    int data;
    ifstream fin;
	int wordsInFile = 0;

    RedBlackTree <string,string > rbt;

	/* original test insertions
    RedBlackTree <int,int > rbt;
    rbt.insert(1,2);
    rbt.insert(2,3);
    rbt.insert(3,6);
    rbt.insert(4,7);
    rbt.insert(5,5);
    rbt.insert(6,2);
    rbt.insert(7,8);
    rbt.print();
	*/
	
    // Check the number of arguments. Expected: filename of a file
    if (argc != 2)  // This check is often hardcoded
    {   // If failure in parameters, offer advice for correction
        cout << "\nThis program uses command-line argument.\n";
        cout << "Usage: a.exe <filename>\n";
        exit(0);
    }


    try  // All lines within this block are part of the same exception handler
    {
        fin.open(argv[1]);  // Open the file for reading
    } 
    catch (exception& ex) 
    {
        cout << ex.what();  // display standard explanation of the exception
        exit(0);  // exit the program
    }
	
	cout << "1024 1024 gray" << endl;  // Graphics output
	
	
    // Read from the file, one token at a time. If the type of token is known, it
    // can be read into a corresponding variable type, such as 
    //          in >> x;    // Read the first item into an integer variable x.
    //          in >> str;  // Read the next item into a string variable str.
            
    while (fin >> token)
    {
        // Do something with the token
        //cout << "token is " << token << endl;
		
		wordsInFile++;
		// treeLevelCounter = 0;  // Reset this data's counter in the tree
	
		rbt.insert(token, token);
		
		rbt.print();
		
	
    } // end while
                
    fin.close();  // Close the file after use
	
	
	rbt.print();
	
    

    
    cout<<rbt.depth()<<endl;

	
	return 0;
}














