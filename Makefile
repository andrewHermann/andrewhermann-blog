.PHONY: help setup-hooks new-feature new-bugfix finish-feature status check-workflow

help: ## Show this help message
	@echo "🚀 Andrew Hermann Blog - Development Commands"
	@echo ""
	@echo "Workflow Commands:"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "Example workflow:"
	@echo "  make new-feature name=fix-seo-issues"
	@echo "  # make changes and commit"
	@echo "  make finish-feature"

setup-hooks: ## Install Git hooks for workflow enforcement
	chmod +x .git/hooks/pre-push .git/hooks/pre-commit
	./.github/git-aliases.sh
	@echo "✅ Git hooks and aliases installed!"

new-feature: ## Start new feature branch (usage: make new-feature name=your-feature)
	@if [ -z "$(name)" ]; then \
		echo "❌ Usage: make new-feature name=your-feature-name"; \
		exit 1; \
	fi
	git checkout main
	git pull origin main
	git checkout -b feature/$(name)
	@echo "✅ Created feature branch: feature/$(name)"

new-bugfix: ## Start new bugfix branch (usage: make new-bugfix name=your-bugfix)
	@if [ -z "$(name)" ]; then \
		echo "❌ Usage: make new-bugfix name=your-bugfix-name"; \
		exit 1; \
	fi
	git checkout main
	git pull origin main  
	git checkout -b bugfix/$(name)
	@echo "✅ Created bugfix branch: bugfix/$(name)"

finish-feature: ## Push current feature branch and create PR
	@branch=$$(git symbolic-ref --short HEAD); \
	if [[ ! "$$branch" =~ ^(feature|bugfix|hotfix)/.+ ]]; then \
		echo "❌ Not on a feature branch. Current: $$branch"; \
		echo "Expected: feature/*, bugfix/*, or hotfix/*"; \
		exit 1; \
	fi; \
	git push origin "$$branch" && \
	gh pr create --assignee @me
	@echo "✅ Feature branch pushed and PR created!"

status: ## Show current workflow status
	@branch=$$(git symbolic-ref --short HEAD); \
	echo "Current branch: $$branch"; \
	if [ "$$branch" = "main" ]; then \
		echo "⚠️  On main branch - create feature branch before changes"; \
		echo "Use: make new-feature name=<description>"; \
	elif [[ "$$branch" =~ ^(feature|bugfix|hotfix)/.+ ]]; then \
		echo "✅ On feature branch - good!"; \
		echo "When ready: make finish-feature"; \
	else \
		echo "⚠️  Branch doesn't follow naming convention"; \
	fi

check-workflow: ## Validate current workflow compliance
	@echo "🔍 Checking workflow compliance..."
	@branch=$$(git symbolic-ref --short HEAD); \
	echo "Branch: $$branch"; \
	if [ "$$branch" = "main" ]; then \
		echo "❌ Working directly on main branch"; \
		echo "Recommendation: Create feature branch"; \
	else \
		echo "✅ Working on feature branch"; \
	fi; \
	uncommitted=$$(git status --porcelain | wc -l); \
	if [ $$uncommitted -gt 0 ]; then \
		echo "⚠️  Uncommitted changes: $$uncommitted files"; \
	else \
		echo "✅ No uncommitted changes"; \
	fi

# Development commands
install: ## Install dependencies
	npm install

dev: ## Start development server
	npm start

build: ## Build for production
	npm run build

test: ## Run tests
	npm test || echo "No tests configured"

lint: ## Run linter
	npm run lint || echo "No linter configured"
