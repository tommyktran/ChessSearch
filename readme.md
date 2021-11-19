# ChessSearch

Author: Tommy Tran

This project allows you to search for chess games beginning with a specific opening using the Lichess API. After taking in the inputs of the opening moves as well as the ratings that the user would like to search for, the program displays the opening and its name below, as well as the statistics of the most common moves following that position, and recent games played starting with that opening are displayed below.

The program takes move inputs in UCI notation. If you are unfamiliar with this form of chess notation, try these openings to test the program with:

- d2d4,d7d5,c2c4 : Queen's Gambit
- d2d4,d7d5,c2c4,d5c4,e2e4,b7b5 : Queen's Gambit Accepted: Central Variation, Greco Variation
- d2d4,g8f6,c2c4,g7g6,b1c3,f8g7,e2e4 : King's Indian Defense: Normal Variation
- e2e4,e7e6,d2d4,d7d5,e4e5 : French Defense: Advance Variation

## Features

- Create a dictionary or list, populate it with several values, retrieve at least one value, and use it in your program

After performing the API call, the program creates a games array which stores the recent games played in that opening, and iterates through that array in order to create the game links and display them below the chess board.

- Connect to an external/3rd party API and read data into your app

The program's main function is to use the Lichess API to search for chess games.

- Visualize data in a graph, chart, or other visual representation of data

After performing the API call, the program displays statistics on the most played moves in that opening.
