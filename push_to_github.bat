@echo off
echo ========================================================
echo Pushing E-Learning Masterpiece Updates to GitHub
echo Repository: Ajit123540/E-learning-
echo ========================================================
echo.

echo 1. Staging updated files...
git add .

echo 2. Committing changes...
git commit -m "feat: Masterpiece UI, Gamer Cards, AI Tutor, and Study Scratchpad"

echo 3. Pushing to GitHub...
git push origin HEAD

echo.
echo ========================================================
echo Done! If you got any errors above, you may need to
echo log into GitHub in your browser.
echo ========================================================
pause
