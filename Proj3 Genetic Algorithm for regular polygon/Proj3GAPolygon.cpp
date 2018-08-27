// Genetic algorithm
// Adapted from http://www.generation5.org/content/2003/gahelloworld.asp
// Here, a chromosome (individual) consists of integer values in the range -5...5, and 
// fitness is difference between the sum of the chromosome's values and some target value.

// #pragma warning(disable:4786)		// disable debug warning

#include <iostream>					// for cout etc.
#include <iomanip>
#include <vector>					// for vector class
#include <string>					// for string class
#include <algorithm>				// for sort algorithm
#include <time.h>					// for random seed
#include <math.h>					// for abs()

#define GA_POPSIZE		32			// ga population size
#define GA_MAXITER		64			// maximum iterations
#define GA_ELITRATE		0.10f		// elitism rate
#define GA_MUTATIONRATE	0.25f		// mutation rate
#define GA_MUTATION		RAND_MAX * GA_MUTATIONRATE
//#define GA_TARGET		std::vector<int>   // 	std::string("Hello world!")
#define GA_CHROMOSOME_SIZE		20
#define GA_TARGET_VALUE	50

using namespace std;				// polluting global namespace, but hey...

// Structure which contains one "individual," or chromosome
struct ga_struct 
{
	vector<int> chromosome;   	// values which comprise this individual
	//string str;				// the string
	unsigned int fitness;		// this individual's fitness
};

typedef vector<ga_struct> ga_vector;// for brevity

//--------------------------------------------------------------------
// The declaration of these formal parameters using ampersands makes the parameters
// ADDRESSES and call-by-reference. Therefore the vectors will retain changes made 
// here to the caller.
void init_population(ga_vector &population,
					 ga_vector &buffer ) 
{
	int tsize = GA_CHROMOSOME_SIZE; //  int tsize = GA_TARGET.size();

	for (int i=0; i<GA_POPSIZE; i++) {
		ga_struct citizen;
		
		citizen.fitness = 0;
		citizen.chromosome.clear();  // citizen.str.erase();

		cout << "Building chromosome " <<setw(2)<< i << ":    ";
		for (int j=0; j<tsize; j++)
		{
			// citizen.chromosome[j] = (rand() % 10) - 5; 		// citizen.str += (rand() % 90) + 32;
			citizen.chromosome.push_back( (rand() % 10) - 5 );
			cout << setw(3) << citizen.chromosome[j];
		}
		cout << endl;

		population.push_back(citizen);
	}

	buffer.resize(GA_POPSIZE);
}

//--------------------------------------------------------------------
// The declaration of these formal parameters using ampersands makes the parameters
// ADDRESSES and call-by-reference. Therefore the vectors will retain changes made 
// here to the caller.
void calc_fitness(ga_vector &population)
{
	// string target = GA_TARGET;
	int tsize = GA_CHROMOSOME_SIZE; //  int tsize = GA_TARGET.size();
	unsigned int fitness;

	for (int i=0; i<GA_POPSIZE; i++) 
	{

		for (int j=0; j<tsize; j++) 
		{

			// The j-th characteristic of the i-th individual is 
			// in the location population[i].chromosome[j]
			
			// Do something in this loop with every value population[i].chromosome[j]
			
			// TBD TBD FIX ME
			
		}
		
		// A "fit" individual will have the sum of its separate characteristics close to
		// the GA_TARGET_VALUE, so the fitness value will be LOW. An undesireable individual
		// will have the sum of its separate characteristics far from the GA_TARGET_VALUE, 
		// so the fitness value will be HIGH.
		
		
		// Complete this function by setting the fitness of the individual 
		// appropriately. 

		// population[i].fitness = ????????????   		// TBD TBD FIX ME
		
		// cout << "Fitness of chromosome " << i << " is " << population[i].fitness << endl;
	}
}

//--------------------------------------------------------------------
bool fitness_sort(ga_struct x, ga_struct y) 
{ return (x.fitness < y.fitness); }

//--------------------------------------------------------------------
// The declaration of these formal parameters using ampersands makes the parameters
// ADDRESSES and call-by-reference. Therefore the vectors will retain changes made 
// here to the caller.
inline void sort_by_fitness(ga_vector &population)
{ sort(population.begin(), population.end(), fitness_sort); }


//--------------------------------------------------------------------
// The declaration of these formal parameters using ampersands makes the parameters
// ADDRESSES and call-by-reference. Therefore the vectors will retain changes made 
// here to the caller.
void elitism(ga_vector &population, ga_vector &buffer, int esize )
{

	/*
	cout << "elitism start" << endl;
	cout << "elitism:   ";
	cout << "population[0] is " << (population)[0].chromosome[0] << endl;
	for (int i=0; i<esize; i++) 
	{
		for (int j=0; j < GA_CHROMOSOME_SIZE; j++)
		{
			cout << (population)[i].chromosome[j] << "  ";
		}
		cout << endl;
	}
	cout << endl;
	cout << "end test at top of elitism" << endl;
	*/

	
	
	for (int i=0; i<esize; i++) 
	{
		// buffer[i].str = population[i].str;
		buffer[i].chromosome.clear();
		for (int j=0; j < GA_CHROMOSOME_SIZE; j++)
		{
			//buffer[i].chromosome[j] = population[i].chromosome[j];  
			buffer[i].chromosome.push_back ( population[i].chromosome[j] );
		}
		buffer[i].fitness = population[i].fitness;
	}
	
	// cout << "end of elitism" << endl;

} // end elitism


//--------------------------------------------------------------------
// Mutate a random element of the chromosome to a random valid value
// The declaration of these formal parameters using ampersands makes the parameters
// ADDRESSES and call-by-reference. Therefore the vectors will retain changes made 
// here to the caller.
void mutate(ga_struct &member)
{
	/*
	int tsize = GA_TARGET.size();
	int ipos = rand() % tsize;
	int delta = (rand() % 90) + 32; 
	member.str[ipos] = ((member.str[ipos] + delta) % 122);
	*/
	
	int ipos = rand() % GA_CHROMOSOME_SIZE;
	member.chromosome[ipos] = (rand() % 10) - 5; 
}


//--------------------------------------------------------------------
// The declaration of these formal parameters using ampersands makes the parameters
// ADDRESSES and call-by-reference. Therefore the vectors will retain changes made 
// here to the caller.
void mate(ga_vector &population, ga_vector &buffer)
{
	int esize = GA_POPSIZE * GA_ELITRATE;
	int tsize = GA_CHROMOSOME_SIZE, spos, i1, i2;
	
	//cout << "Mate start" << endl;
	//cout << "population[0] is " << *(population[0]).chromosome[0] << endl;

	elitism(population, buffer, esize);

	// Mate the rest
	for (int i=esize; i<GA_POPSIZE; i++) {
		i1 = rand() % (GA_POPSIZE / 2);
		i2 = rand() % (GA_POPSIZE / 2);
		spos = rand() % tsize;

		/*
		buffer[i].str = population[i1].str.substr(0, spos) + 
			            population[i2].str.substr(spos, esize - spos);
		*/
		
		//cout << "Mate:  i1 is " << i1 << ", i2 is " << i2 << ", spos is " << spos << endl;
		
		buffer[i].chromosome.clear();
		for (int xx = 0; xx < spos; xx++)
		{
			//cout << "       first, " << xx << endl;
			buffer[i].chromosome.push_back( population[i1].chromosome[xx]);
		}
		for (int xx = spos; xx < GA_CHROMOSOME_SIZE; xx++)
		{
			//cout << "       second, " << xx << endl;
			buffer[i].chromosome.push_back( population[i2].chromosome[xx] );
		}
		
		/*
		cout << "Mate:  done mating" << endl;
		cout << "Mated " << i1 << " and " << i2 << " into " << i << " to get:  ";
		for (int xx = 0; xx < GA_CHROMOSOME_SIZE; xx++)
		{
			cout << buffer[i].chromosome[xx] << "  ";
		}
		*/
		
		if (rand() < GA_MUTATION) mutate( buffer[i]);
	}
	
	//cout << "end of mate" << endl;
	
} // end mate

//--------------------------------------------------------------------
void print_best(ga_vector gav)
{
	// cout << "Best: " << gav[0].str << " (" << gav[0].fitness << ")" << endl; 
	int tsize = GA_CHROMOSOME_SIZE; //  int tsize = GA_TARGET.size();

	cout << "Best:   ";
	for (int j=0; j<tsize; j++) 
	{
		cout << gav[0].chromosome[j] << "  ";	
	}
	cout << " (" << gav[0].fitness << ")" << endl;
}

//--------------------------------------------------------------------
// The declaration of these formal parameters using ampersands makes the parameters
// ADDRESSES and call-by-reference. Therefore the vectors will retain changes made 
// here to the caller.
inline void swap(ga_vector *&population,  	// *& is a declaration of a call-by-reference pointer
				 ga_vector *&buffer)   		// *& is a declaration of a call-by-reference pointer
{ ga_vector *temp = population; population = buffer; buffer = temp; }

//--------------------------------------------------------------------
int main()
{
	unsigned int gen = 0;  // counter of generation iterator
	srand(unsigned(time(NULL)));

	ga_vector pop_alpha, pop_beta; 			// Declaration but not definition (space is not defined)
	ga_vector *population, *buffer; 		// Declaration but not definition (pointers are not assigned)

	// In the declaration of the function init_population(), the parameters are 
	// declared as ADDRESSES by using ampersands in the formal parameters.
	// Therefore the parameters pop_alpha and pop_beta are call-by-reference
	// and will retain changes made by init_population() upon return here.
	init_population(pop_alpha, pop_beta);
	
	population = &pop_alpha;  // Set pointer to the address of now-defined memory space
	buffer = &pop_beta;  // Set pointer to the address of now-defined memory space

	for (gen=0; gen<GA_MAXITER; gen++) {
		calc_fitness(*population);		// calculate fitness
		sort_by_fitness(*population);	// sort them
		cout << "During main, generation " << gen << ":" << endl;
		print_best(*population);		// print the best one

		if ((*population)[0].fitness == 0) break;  // Low fitness value is desireable

		mate(*population, *buffer);		// mate the population together
		swap(population, buffer);		// swap buffers
	}

	cout << "At end of main, generation " << gen << ":" << endl;
	print_best(*population);		// print the best one

	return 0;
}
