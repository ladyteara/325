/************************
Tara Walton
tara1984
Assn 3 - Due 2/22/16
Instructions:	Assignment must be compiled and run from VS Studio on my machine.
				There are numerous errors referring to 
************************/


#include<iostream>
#include<iomanip>
#include<vector>
#include<algorithm>
#include<fstream>
#include<string>

using namespace std;

class Project
{
public:
	// Constructor
	Project()
	{
		start = 0; end = 0; run = 0;
		projID = 0;
	}											// end constructor

	Project(int a, int b, int id)
	{
		start = a; run = b; projID = id;
		end = start + run;
	}											// end constructor

	int getStart() { return start; }
	int getRun() { return run; }
	int getEnd() { return end; }
	int getID() { return projID; }

private:
	int start = 0;
	int run = 0;
	int end = 0;
	int projID = 0;

friend ostream& operator<<(ostream& out, Project l);
};												// end class Point

ostream& operator <<(ostream& out, Project l)
{
	cout << setw(6) << l.getStart() /*<< setw(6) << l.getRun()*/ << setw(6) << l.getEnd() /*<<setw(9)<< l.getID()*/ << endl;
	return out;
}

bool sortByEnd(Project& lhs, Project& rhs)
{ return lhs.getEnd() < rhs.getEnd(); }




int main(/*int argc, char *argv[]*/)
{
	ifstream fin;
	int projCounter = 0;
	int start, run;
	int counter = 0;							// number of pairs in the file
	vector<Project> projects;
	vector<Project> scheduled;
	string file = " ";

	//cout << "Please enter file location and name: ";
	//cin >> file;

	fin.open("C:\\Users\\Tara\\Google Drive\\_CSC325 - Algorithms\\Assn3\\Med_N_Telescope.txt");	
	//fin.open(file);
	if (!fin.is_open())
	{
		cout << "File failed to open. Please make sure it is in the correct location and you have permisson to access this file.\n";
		return 0;
	}

	// Check the number of arguments. Expected: filename of a file
	//if (argc != 2)  // This check is often hardcoded
	//{   // If failure in parameters, offer advice for correction
	//	cout << "\nThis program uses command-line argument.\n";
	//	cout << "Usage: a.exe <filename>\n";
	//	exit(0);
	//}
	//try						// All lines within this block are part of the same exception handler
	//{
	//	fin.open(argv[1]);
	//}
	//catch (exception& ex)
	//{
	//	cout << ex.what();		// display standard explanation of the exception
	//	exit(0);				// exit the program
	//}

	fin >> counter;
	while (fin >> start)
	{
		fin >> run;

		Project dummyProj(start, run, projCounter);
		projects.push_back(dummyProj);
		projCounter++;
	}

	sort(projects.begin(), projects.end(), sortByEnd);

	////SELF CHECK - Print initial data
	//cout << "initial project data\n";
	//cout <<setw(6) <<"Start" << setw(6) <<"Run" << setw(6) << "End" << setw(9) << "Project#" << endl;
	//for (int i = 0; i < projects.size(); i++)
	//{
	//	cout << projects.at(i) << endl;
	//}
	
	//store first project (earliest end time) in new vector as starting point
	scheduled.push_back(projects.at(0));
	int i = 0;
	for(short j = 1; j < projCounter; j++)
	{
		if(scheduled.at(i).getEnd() <= projects.at(j).getStart())
		{
			scheduled.push_back(projects.at(j));
			i++;
		}
	}

	cout << endl;
	cout << scheduled.size() << " astromony projects can be scheduled." << endl;
	cout << setw(6) << "Start" /*<< setw(6) << "Run" */<< setw(6) << "End" /*<< setw(9) << "Project#" */<< endl;
	for (int i = 0; i < scheduled.size(); i++)
	{
		cout << scheduled.at(i);
	}
}