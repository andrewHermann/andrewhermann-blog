#!/bin/bash
# Git aliases to enforce proper workflow

echo "Setting up Git aliases for proper workflow..."

# Alias for starting new features
git config alias.new-feature '!f() { 
    if [ -z "$1" ]; then 
        echo "Usage: git new-feature <issue-number-description>"; 
        return 1; 
    fi; 
    git checkout main && 
    git pull origin main && 
    git checkout -b feature/$1; 
}; f'

# Alias for starting bugfixes
git config alias.new-bugfix '!f() { 
    if [ -z "$1" ]; then 
        echo "Usage: git new-bugfix <issue-number-description>"; 
        return 1; 
    fi; 
    git checkout main && 
    git pull origin main && 
    git checkout -b bugfix/$1; 
}; f'

# Alias for finishing features (creates PR)
git config alias.finish-feature '!f() {
    branch=$(git symbolic-ref --short HEAD);
    if [[ ! "$branch" =~ ^(feature|bugfix|hotfix)/.+ ]]; then
        echo "❌ Not on a feature branch. Use: feature/*, bugfix/*, or hotfix/*";
        return 1;
    fi;
    git push origin "$branch" && 
    gh pr create --assignee @me;
}; f'

# Alias for safe main checkout with updates
git config alias.main-safe '!git checkout main && git pull origin main'

# Alias to show current workflow status
git config alias.workflow-status '!f() {
    branch=$(git symbolic-ref --short HEAD);
    echo "Current branch: $branch";
    if [ "$branch" = "main" ]; then
        echo "⚠️  On main branch - create feature branch before making changes";
        echo "Use: git new-feature <description>";
    elif [[ "$branch" =~ ^(feature|bugfix|hotfix)/.+ ]]; then
        echo "✅ On feature branch - good!";
        echo "When ready: git finish-feature";
    else
        echo "⚠️  Branch doesn't follow naming convention";
    fi;
}; f'

echo "✅ Git aliases configured!"
echo ""
echo "Available commands:"
echo "  git new-feature <name>     - Start new feature branch"
echo "  git new-bugfix <name>      - Start new bugfix branch"  
echo "  git finish-feature         - Push branch and create PR"
echo "  git main-safe              - Safely switch to main and update"
echo "  git workflow-status        - Check current workflow status"
echo ""
echo "Example usage:"
echo "  git new-feature fix-seo-issues"
echo "  # make changes, commit"
echo "  git finish-feature"
