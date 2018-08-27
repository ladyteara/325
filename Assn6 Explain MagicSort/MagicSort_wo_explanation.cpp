// Ken Vollmar, KenVollmar@missouristate.edu, Missouri State University
// IMPORTANT: compile using C++11 Standard,   g++ -std=c++11 
#include <iostream>
#include <cstdlib>
#include <cstdio>
#include <vector>
#include <time.h>   // for clock
using namespace std;

// This sort has the illusion of execution in O(N) time -- but it's not O(N) time.
void MagicSort(vector<int>::iterator first, vector<int>::iterator last)		/// Takes a vector iterator called first and one called last.
{
	vector<int>::iterator i, j;
	for (i = first; i <= last; i++)
	{
		cout << "Comparing data " << *i << " to data " << *(i+1) << endl;
		if (*i > *(i+1))
		{
			iter_swap(i, i+1);  /// Swaps the values of the elements the given iterators are pointing to.
			
			// This line of code is both poor practice and essential to the operation of this sort.
			i = first-1;		/// Points to a position before the 
			cin.ignore();
		}
	}
}

int main ()
{

	int elements = 20;  // number of elements in vector to be sorted
	vector<int> myvector;
	for (int i=1; i<=elements; i++) myvector.push_back(rand());  // random contents to vector

	cout << "myvector initially contains: ";
	for (vector<int>::iterator it = myvector.begin() ; it != myvector.end(); ++it)
	{
		cout << *it << "  ";
	}
	cout << endl;
	cin.ignore();	///added to see initial values

	MagicSort(myvector.begin(), myvector.end());

	int timeItTook = clock();  // Returns the processor time consumed by the program. 
	printf ("Sorting %d items took %d clicks (%f seconds).\n", elements, timeItTook, 
	((float)timeItTook)/CLOCKS_PER_SEC);

	cout << "myvector sorted contains: ";
	for (vector<int>::iterator it = myvector.begin() ; it != myvector.end(); ++it)
	{
		cout << *it << "  ";
	}
	cout << endl;

	cin.ignore();
	return(0);

}