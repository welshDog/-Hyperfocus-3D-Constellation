# Let's prepare the complete repository data for the 3D constellation
import json

# Repository data from the GitHub analysis
repositories = [
    {
        "name": "-MIND-VAULT-ULTIMATE-GAME",
        "category": "Creative",
        "description": "Welcome to Hyperfocus Zone - where your neurodivergent visual-spatial superpowers shine! This guide gets you playing and mastering puzzles in minutes.",
        "language": "JavaScript",
        "stars": 0,
        "updated": "1 hour ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/-MIND-VAULT-ULTIMATE-GAME"
    },
    {
        "name": "THE-HYPERFOCUS-ultra-FULL-MODE-EXPERIENCE-",
        "category": "Core Empire",
        "description": "ADHD-friendly design - quick visual feedback, bite-sized interactions. Gamified progress - perfect for your BROski$ system. 3D/AR elements.",
        "language": "JavaScript",
        "stars": 0,
        "updated": "2 days ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/THE-HYPERFOCUS-ultra-FULL-MODE-EXPERIENCE-"
    },
    {
        "name": "-ULTIMATE-ADHD-BRAIN-ARCADE-",
        "category": "Core Empire",
        "description": "The World's First Professional-Grade Brain Training Platform Designed Specifically for ADHD & Neurodivergent Minds",
        "language": "JavaScript",
        "stars": 0,
        "updated": "2 days ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/-ULTIMATE-ADHD-BRAIN-ARCADE-"
    },
    {
        "name": "Hyperfocus-Booster-Beacon",
        "category": "Creative",
        "description": "The way those binaural beats kick in when you hit that pulsing center... chef's kiss 👌 And those particle effects? Pure eye candy for the ADHD brain!",
        "language": "CSS",
        "stars": 0,
        "updated": "2 days ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/Hyperfocus-Booster-Beacon"
    },
    {
        "name": "hyperfocus-constellation",
        "category": "Core Empire",
        "description": "hyperfocus constellation a star map of all the hyperfocus zone repos",
        "language": "CSS",
        "stars": 1,
        "updated": "2 days ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/hyperfocus-constellation"
    },
    {
        "name": "HYPERFOCUSzone-starting-code-",
        "category": "Core Empire",
        "description": "HYPERFOCUS Mega Fusion Ecosystem - Private Development Repository",
        "language": "Python",
        "stars": 1,
        "updated": "3 days ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/HYPERFOCUSzone-starting-code-"
    },
    {
        "name": "HyperSpace",
        "category": "Dev Tools",
        "description": "Next-generation development environment for neurodivergent minds",
        "language": "TypeScript",
        "stars": 0,
        "updated": "5 days ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/HyperSpace"
    },
    {
        "name": "BROski-Hyperspace-template",
        "category": "Dev Tools",
        "description": "BROski-Hyperspace-template a cool place to vibe code",
        "language": "TypeScript",
        "stars": 0,
        "updated": "5 days ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/BROski-Hyperspace-template"
    },
    {
        "name": "My-Social-COMs-Buddy",
        "category": "Social",
        "description": "AI to help me communicate with others with my Dyslexia",
        "language": "TypeScript",
        "stars": 1,
        "updated": "5 days ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/My-Social-COMs-Buddy"
    },
    {
        "name": "hyperfocus-neurodivergent-HYPER-tool",
        "category": "Dev Tools",
        "description": "Ultimate toolkit for neurodivergent developers",
        "language": "JavaScript",
        "stars": 1,
        "updated": "last week",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/hyperfocus-neurodivergent-HYPER-tool"
    },
    {
        "name": "HYPERFOCUS-ZONE-NEURO-SOCIAL-DREAMER-",
        "category": "Social",
        "description": "Hyperfocus Social: Reimagining Social Media for Neurodivergent Creators",
        "language": "JavaScript",
        "stars": 1,
        "updated": "last week",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/HYPERFOCUS-ZONE-NEURO-SOCIAL-DREAMER-"
    },
    {
        "name": "HYPERFOCUS-UNIFIED-EMPIRE",
        "category": "Core Empire",
        "description": "Unified AI HyperFocus Ecosystem",
        "language": "Python",
        "stars": 1,
        "updated": "last week",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/HYPERFOCUS-UNIFIED-EMPIRE"
    },
    {
        "name": "hl-model-api",
        "category": "Dev Tools",
        "description": "test on a easy AI build on week ass laptop",
        "language": "Python",
        "stars": 0,
        "updated": "last week",
        "status": "development",
        "githubUrl": "https://github.com/welshDog/hl-model-api"
    },
    {
        "name": "HYPERFOCUSzone-Community",
        "category": "Social",
        "description": "HYPERFOCUS Mega Fusion Ecosystem - Community Showcase",
        "language": "HTML",
        "stars": 1,
        "updated": "last week",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/HYPERFOCUSzone-Community"
    },
    {
        "name": "Hyper-vibe-engine",
        "category": "Creative",
        "description": "Turn images into soundtracks. Turn stories into portals",
        "language": "JavaScript",
        "stars": 1,
        "updated": "last week",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/Hyper-vibe-engine"
    },
    {
        "name": "hyper-vibe-studio",
        "category": "Creative",
        "description": "🚀 Ultimate VS Code Workspace Configuration - Automation Revolution v3.0",
        "language": "JavaScript",
        "stars": 1,
        "updated": "2 weeks ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/hyper-vibe-studio"
    },
    {
        "name": "github-ai-mangaer-helper",
        "category": "Dev Tools",
        "description": "🚀 Advanced GitHub repository security scanner with AI assistance",
        "language": "Python",
        "stars": 1,
        "updated": "2 weeks ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/github-ai-mangaer-helper"
    },
    {
        "name": "-HYPERFOCUS-ZONE-Omega-Vault-",
        "category": "Core Empire",
        "description": "The Omega Vault is the legendary archive of the Hyperfocus Zone — a secure chamber of artifacts, constructs, and relics forged in pure focus.",
        "language": "JavaScript",
        "stars": 1,
        "updated": "2 weeks ago",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/-HYPERFOCUS-ZONE-Omega-Vault-"
    },
    {
        "name": "RAZ-PI-EYE",
        "category": "Dev Tools",
        "description": "way to see inside a raspberry pi CPU with wifi or bluetooth",
        "language": "TypeScript",
        "stars": 1,
        "updated": "last month",
        "status": "maintenance",
        "githubUrl": "https://github.com/welshDog/RAZ-PI-EYE"
    },
    {
        "name": "tHe-HYPER-dOoK-STorY",
        "category": "Creative",
        "description": "OUR HYPER dOoK of life",
        "language": "HTML",
        "stars": 1,
        "updated": "last month",
        "status": "active",
        "githubUrl": "https://github.com/welshDog/tHe-HYPER-dOoK-STorY"
    }
]

# Convert to JSON for the application
repo_data = json.dumps(repositories, indent=2)
print("Repository data prepared for 3D Constellation:")
print(f"Total repositories: {len(repositories)}")

# Category breakdown
categories = {}
for repo in repositories:
    cat = repo['category']
    if cat not in categories:
        categories[cat] = 0
    categories[cat] += 1

print("\nCategory breakdown:")
for cat, count in categories.items():
    print(f"  {cat}: {count} repos")

print("\n" + "="*50)
print("JSON DATA FOR APPLICATION:")
print("="*50)
print(repo_data)