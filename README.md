# Pokemon Stats Analyzer

Welcome to the Pokemon Stats analyzer! A small Vite and React app to view Pokemon stats, type matchups, abilities and moves using the PokeApi

## Overview

The goal is to provide a sleek no fluff format to quickly view information on pokemon stats for competitive players.

Users are able to search for Pokemon by their Dex number or name with an auto-suggest feature and view:

- Base Stats with a visualization bar
- A type matchup chart and also individual pokemon's weaknesses
- Full move lists organized by category (physical, special, status)
- Abilities and their descriptions
- official artwork and sprite
- A persistent favorites system stored in local storage

## Key features

### Autosuggest Search Bar

- Prefetches all Pokemon on load (1000 +)
- Realtime filtering with keyboard or mouse navigation

### Stat Visualization

- Base stats displayed numerically and by colored bars
- Easy visualization across all stats

### Type Matchup Matrix

- full 18x18 matrix
- calculates attacker to defender multipliers
- color coded for easy view

### Moves and Abilities

- Fetches full move data: Power, accuracy, PP, type, category and move description
- Hover with glow dynamically adjusts using CSS
- Organizes moves by types with drop down menu
- Display descriptions via hover tooltip

### Favorites System

- Allows users to save or remove any pokemon
- Persists between sessions
- Pull any favorite pokemon by clicking their pill in the list

## Tech Stack

- React
- Vite
- PokéAPI (public REST API)

## How to run

1. Clone Repository
   git clone https://github.com/gerrywiegand/Pokemon-Stat-analyzer.git

2. Install dependencies

npm install

3. Start server

npm run dev

## Deployment

Currently deployed using render

https://pokemon-stat-analyzer.onrender.com

# Future improvements

Upcoming updates will include

- A pokemon to pokemon comparison mode
- Team builder with analysis
- Animations
- Light/dark theme toggle
- Open to suggestions

# Acknowledgments

- Thank you to PokéAPI for providing a free and extensive Pokémon dataset.
- Inspired by classic Pokemon designs and competitive resources such as Pokemon Showdown and Bulbapedia
