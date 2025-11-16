#!/bin/bash
# Script to push code to GitHub
# Replace YOUR_USERNAME and REPO_NAME with your actual values

echo "Enter your GitHub username:"
read GITHUB_USERNAME

echo "Enter your repository name (e.g., cybersecurity-portfolio):"
read REPO_NAME

# Add remote
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main

echo "✅ Code pushed to GitHub!"
echo "Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"

