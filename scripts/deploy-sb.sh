cd ./dist-sb
rm -rf .git 
git init 
git add . 
git commit -am "storybook" 
git remote add origin https://github.com/akili862002/react-mac-ui-sb-dist.git
git branch -M dist-sb
git push -f origin dist-sb
echo ""
echo "------------------------------------------------"
echo "  [✅] Wala, deployed storybook successfully!"
echo "  [Deployed] https://react-mac-ui.netlify.app/"
echo "------------------------------------------------"
cd ..