# Numesmatic App

## Overview
The Numesmatic App is a mobile application designed to simplify the process of storing and managing coin collections for numismatists. Built using React Native, JavaScript, CSS, and Firebase, this app offers a user-friendly interface for managing coins, converting currencies, and storing coin-related data efficiently. The application replaces traditional pen-and-paper methods with a digital solution, providing enhanced functionality and ease of use.

## Features
Authentication Page
Login: Allows users to log into their accounts securely.
Registration: Enables new users to create an account and access the app's features.

## Homepage
Provides an overview and access to the main functionalities of the app, including navigation to other pages.

![WhatsApp Image 2024-09-15 at 15 35 56_3a80b68c](https://github.com/user-attachments/assets/e4e066b2-ec3c-4813-a7f7-add9027cfbcf)

## MyCollection Page
View Collected Coins: Displays a list of coins collected by the user.
Details: Shows detailed information about each coin, including name, country, year, material, rarity, and images.
Search Function: Allows users to filter coins based on name or country.

![WhatsApp Image 2024-09-15 at 15 35 55_e56a7e16](https://github.com/user-attachments/assets/f3f5164f-30a1-4925-ab4d-4ad583b52f8e)

## AddCoins Page
Add New Coin: Allows users to add new coins to their collection.
Input Fields: Includes fields for uploading front and back images, entering coin name, country, material, year, and rarity.

![WhatsApp Image 2024-09-15 at 15 35 55_7dfc957e](https://github.com/user-attachments/assets/e879ee51-745f-4c2c-8b18-0ddfc3e4760c)

![WhatsApp Image 2024-09-15 at 15 35 54_57e85e28](https://github.com/user-attachments/assets/ab7bb9e3-aa4c-42e3-b40d-74ae25879516)


## Currency Converter
Converts between different currencies, helping users assess the value of their coins in various currencies.

![WhatsApp Image 2024-09-15 at 15 35 53_0f83576d](https://github.com/user-attachments/assets/a7a15558-5db5-41eb-ac87-498e3ae6bd19)


## Technology Stack
React Native: Framework for building native mobile applications using React.
JavaScript: Programming language used for the app's logic and functionality.
CSS: Styling language for designing the user interface.
Firebase: Backend service for authentication and real-time database management.

## Firebase Integration
Authentication: Handles user login and registration through Firebase Authentication.
Realtime Database: Stores and retrieves coin data, including user-specific collections.
Firebase Database Structure
Users: Contains user-specific data.
User ID: Unique identifier for each user.
Coins: Collection of coins added by the user.
Coin ID: Unique identifier for each coin.
coinType: Type of the coin (e.g., Rare).
condition: Condition of the coin (e.g., Common).
country: Country of origin.
imageBack: URL of the back image of the coin.
imageFront: URL of the front image of the coin.
material: Material of the coin.
name: Name of the coin.
timestamp: Date and time when the coin was added.
year: Year of minting.

## Getting Started
Prerequisites
Node.js and npm installed on your development machine.
Expo CLI installed (npm install -g expo-cli).
Installation

Clone the repository:
bash
Copy code
git clone <repository-url>
cd <project-directory>

Install dependencies:
bash
Copy code
npm install

Set up Firebase:
Create a Firebase project and configure Firebase Authentication and Realtime Database.
Update the firebase.js file with your Firebase project's configuration.

Run the app:
bash
Copy code
expo start

Usage
Authentication: Use the authentication page to log in or register a new account.
Homepage: Navigate to different sections of the app from the homepage.
MyCollection: View and search your collected coins. Filter coins by name or country.
AddCoins: Add new coins to your collection with detailed information.
Currency Converter: Convert coin values to different currencies.

## Contributing
Feel free to submit issues or pull requests. Contributions are welcome to improve the functionality and performance of the app.
